const API_ORIGIN = "";

let ballotEnabled = false;
let busy = false;

window.onload = async function () {
  const token = localStorage.getItem("evote_token");
  const verifiedVoterId = localStorage.getItem("verifiedVoterId");
  if (!token || !verifiedVoterId) {
    alert("Please verify identity first.");
    window.location.href = "verify.html";
    return;
  }
  initializeControlUnit();
  await loadEVM();
  closeVoting(true);
};

async function loadEVM() {
  const candidatePanel = document.getElementById("candidateList");
  const buttonPanel = document.getElementById("buttonPanel");
  candidatePanel.innerHTML = "<p style='padding:12px;'>Loading candidates...</p>";
  buttonPanel.innerHTML = "";

  const candidates = await fetchCandidates();
  if (!candidates.length) {
    candidatePanel.innerHTML = "<p style='padding:20px;text-align:center;color:#999;'>No candidates available</p>";
    return;
  }

  candidatePanel.innerHTML = "";
  buttonPanel.innerHTML = "";

  candidates.forEach((candidate) => {
    const candidateRow = document.createElement("div");
    candidateRow.className = "evm-row";
    candidateRow.innerHTML = `
      <div class="candidate-info">
        <div class="candidate-symbol"><div class="symbol-box">${escapeHtml(candidate.symbol || "")}</div></div>
        <div class="candidate-details">
          <div class="candidate-name">${escapeHtml(candidate.name)}</div>
          <div class="party-name">${escapeHtml(candidate.party || "Independent")}</div>
          <div class="candidate-meta">
            <span class="constituency">${escapeHtml(candidate.constituency || "N/A")}</span>
            <span class="state">${escapeHtml(candidate.state || "N/A")}</span>
          </div>
        </div>
      </div>
    `;
    candidatePanel.appendChild(candidateRow);

    const buttonRow = document.createElement("div");
    buttonRow.className = "evm-row";

    const voteBtn = document.createElement("button");
    voteBtn.className = "evm-button";
    voteBtn.innerText = "Vote";
    voteBtn.disabled = true;

    const led = document.createElement("div");
    led.className = "led-light";

    voteBtn.onclick = () => castVote(candidate, voteBtn, led);

    buttonRow.appendChild(voteBtn);
    buttonRow.appendChild(led);
    buttonPanel.appendChild(buttonRow);
  });

  updateVoteButtonStates();
}

async function fetchCandidates() {
  const res = await fetch(API_ORIGIN + "/api/spectator/candidates");
  const data = await safeJson(res);
  if (!res.ok) throw new Error((data && (data.error || data.message)) || res.statusText || "Failed to load candidates");
  return (data && data.candidates ? data.candidates : []).map((c) => ({
    id: c.id,
    name: c.name,
    party: c.party,
    symbol: c.symbol || "",
    electionId: c.electionId,
    constituency: c.constituency || "",
    state: c.state || "",
    logo: c.logo || "",
  }));
}

async function checkElectionLive() {
  try {
    if (!window.contract) await connectWallet();
    const electionId = await getActiveElectionId();

    if (electionId === null) {
      alert("The blockchain says no election is currently active!");
      return false;
    }
    return true;
  } catch (err) {
    console.error("Blockchain verification error:", err);
    return false;
  }
}

async function castVote(candidate, button, led) {

  console.log("contract:", window.contract);
  console.log("candidate:", candidate);

  const token = localStorage.getItem("evote_token");
  if (!token) return (window.location.href = "verify.html");

  if (sessionStorage.getItem("hasVoted") === "true") return alert("Vote already recorded.");
  if (!ballotEnabled) return alert("Press Ballot first.");
  if (busy) return;

  setMachineBusy(true);

  try {
    if (!window.contract) {
      await connectWallet();
    }

    const electionId = await getActiveElectionId();
    console.log("Active electionId:", electionId);      //check active election id in console

    const allowed = await checkElectionLive();
    if (!allowed) return;

    if (electionId === null) return;

    // --- NEW AUTO-VIP SYSTEM ---
    const myAddress = await signer.getAddress();
    const isApproved = await window.contract.isVerified(myAddress);

    if (!isApproved) {
        alert("Hold on! You aren't verified on the blockchain yet. Please confirm this MetaMask transaction to get VIP access.");
        const verifyTx = await window.contract.approveVoter(myAddress, {
            maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
            maxFeePerGas: ethers.parseUnits("40", "gwei")
        });
        await verifyTx.wait();
        alert("Identity verified! Now please confirm the next MetaMask transaction to cast your actual vote.");
    }

    // 2️⃣ send vote to blockchain
    const txHash = await commitVote(electionId, candidate.id);

    // 3️⃣ send proof to backend
    const res = await fetch(API_ORIGIN + "/api/voter/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        candidateId: Number(candidate.id),
        electionId: electionId,
        txHash: txHash
      }),

    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data?.error || data?.message || "Vote failed");

    // 4️⃣ UI updates
    sessionStorage.setItem("hasVoted", "true");
    sessionStorage.setItem("vote_receipt", txHash);

    button.innerText = "Voted";
    button.disabled = true;
    led.classList.add("active");

    // PLAY THE BEEP SOUND HERE
    document.getElementById('evmBeep').play();

    // success animation
    const overlay = document.getElementById("voteSuccessOverlay");
    if (overlay) {
      overlay.style.display = "flex";
      setTimeout(() => {
        window.location.href = "success.html";
      }, 500);
    }

  } catch (err) {
    alert("Vote error: " + err.message);
    console.error(err);
  } finally {
    setMachineBusy(false);
  }
}

// control unit
function enableBallot() {
  if (sessionStorage.getItem("hasVoted") === "true") return alert("Vote already recorded.");
  ballotEnabled = true;
  setLed("ballotLED", true);
  setLed("closeLED", false);
  updateVoteButtonStates();
}

function closeVoting(initial = false) {
  ballotEnabled = false;
  setLed("ballotLED", false);
  setLed("closeLED", true);
  updateVoteButtonStates();
  if (!initial) alert("Voting closed.");
}

function initializeControlUnit() {
  setLed("powerLED", true);
  setLed("ballotLED", false);
  setLed("busyLED", false);
  setLed("closeLED", true);
}

function setMachineBusy(isBusy) {
  busy = isBusy;
  setLed("busyLED", isBusy);
  updateVoteButtonStates();
}

function updateVoteButtonStates() {
  document.querySelectorAll(".evm-button").forEach((btn) => {
    btn.disabled = !ballotEnabled || busy || sessionStorage.getItem("hasVoted") === "true";
  });
}

function setLed(id, on) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.width = "14px";
  el.style.height = "14px";
  el.style.borderRadius = "50%";
  el.style.background = on ? "#00ff00" : "#500";
}

function showVoteSuccess() {
  const overlay = document.getElementById("voteSuccessOverlay");
  if (!overlay) return;

  overlay.style.display = "flex";

  // Redirect to success page after short delay
  setTimeout(() => {
    window.location.href = "success.html";
  }, 500);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[ch]));
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
