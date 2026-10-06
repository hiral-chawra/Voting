// =============================
// API CONFIG
// =============================

const API_ORIGIN = "";

console.log("ADMIN JS LOADED");

// =============================
// PRELOADED STATES (Frontend Seed)
// =============================

const states = [
    "Uttar Pradesh",
    "Maharashtra",
    "Tamil Nadu",
    "Karnataka",
    "West Bengal",
    "Rajasthan",
    "Gujarat"
];

// =============================
// PAGE INIT
// =============================

window.onload = async function () {

    const role = localStorage.getItem("sessionRole");

    if (role !== "admin") {
        alert("Admin access only.");
        window.location.href = "index.html";
        return;
    }

    loadPartyForm();
    loadConstituencyForm();
    loadCandidateForm();
    loadAdminSummary(); // Load elections from backend
    await updateStatusDisplay();
    await updateCandidateFormLock();
    loadProposals();
};

// =============================
// PARTY FORM
// =============================

function loadPartyForm() {

    const form = document.getElementById("partyForm");
    if (!form) return;

    form.innerHTML = `
    <input type="text" placeholder="Party Name">
    <input type="text" placeholder="Short Name">
    <input type="text" placeholder="Symbol URL">
    <input type="text" placeholder="Leader Name">
    <input type="number" placeholder="Founded Year">

    <button type="button">Save Party</button>
  `;
}

// =============================
// CONSTITUENCY FORM
// =============================

function loadConstituencyForm() {

    const form = document.getElementById("constituencyForm");
    if (!form) return;

    form.innerHTML = `
    <input type="text" id="constName" placeholder="Constituency Name">

    <select id="constState">
      <option value="">Select State</option>
      ${states.map(s => `<option value="${s}">${s}</option>`).join("")}
    </select>

    <select id="constType" onchange="toggleParentField()">
      <option value="">Select Type</option>
      <option value="PARLIAMENTARY">Parliamentary</option>
      <option value="ASSEMBLY">Assembly</option>
      <option value="GRAM">Gram Panchayat</option>
    </select>

    <div id="parentContainer" style="display:none;">
      <select>
        <option value="">Select Parent Constituency</option>
      </select>
    </div>

    <button type="button">Save Constituency</button>
  `;
}

function toggleParentField() {

    const type = document.getElementById("constType").value;
    const parentDiv = document.getElementById("parentContainer");

    if (!parentDiv) return;

    if (type === "ASSEMBLY" || type === "GRAM") {
        parentDiv.style.display = "block";
    } else {
        parentDiv.style.display = "none";
    }
}

// =============================
// CANDIDATE FORM
// =============================

function loadCandidateForm() {

    const form = document.getElementById("candidateForm");
    if (!form) return;

    form.innerHTML = `
    <input type="text" id="candName" placeholder="Full Name">
    <input type="number" id="candAge" placeholder="Age">

    <select id="candGender">
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <input type="text" id="candParty" placeholder="Party Name">

    <select id="candElection">
      <option value="">Select Election ID</option>
      <option value="1">Election 1 (Demo)</option>
      <option value="2">Election 2</option>
    </select>

    <input type="text" id="candConstituency" placeholder="Constituency">
    <input type="text" id="candSymbol" placeholder="Party Symbol">

    <button type="button" onclick="saveCandidate()">Save Candidate</button>
  `;
}

async function saveCandidate() {
    const name = document.getElementById("candName").value.trim();
    const party = document.getElementById("candParty").value.trim();
    const symbol = document.getElementById("candSymbol").value.trim();
    const electionId = document.getElementById("candElection").value;
    const constituency = document.getElementById("candConstituency").value.trim();

    if (!name || !party || !symbol || !electionId || !constituency) {
        alert("Please fill all candidate fields");
        return;
    }

    const token = localStorage.getItem('evote_token');
    if (!token) return alert('Admin token missing. Please login again.');

    try {
        const res = await fetch(API_ORIGIN + '/api/admin/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name,
                party,
                symbol,
                electionId: Number(electionId),
                constituency,
                constituencyType: 'general',
                state: 'DemoState'
            })
        });

        let data = null; try { data = await res.json(); } catch (e) { data = null; }

        if (!res.ok) {
            const msg = (data && (data.error || data.message)) || res.statusText;
            throw new Error(msg);
        }

        alert('Candidate added successfully! ID: ' + (data.id || 'N/A'));
        loadCandidateForm();
    } catch (err) {
        alert('Error saving candidate: ' + err.message);
    }
}

async function createElectionUI() {
    const name = document.getElementById("bcElectionName").value.trim();
    const duration = document.getElementById("bcElectionDuration").value;

    if (!name || !duration) {
        return alert("Please enter both an election name and a duration in minutes.");
    }

    if (!window.contract) await connectWallet();

    // Send to blockchain
    await createElection(name, Number(duration));

    // Clear the inputs after success
    document.getElementById("bcElectionName").value = "";
    document.getElementById("bcElectionDuration").value = "";

    // Refresh the proposals list so the admin can approve it immediately!
    // 5. Wait 3 seconds for Polygon to sync, THEN refresh!
    console.log("Waiting for blockchain nodes to sync...");
    document.getElementById("proposalList").innerHTML = "Syncing with blockchain... Please wait.";

    setTimeout(() => {
        loadProposals();
    }, 3000); // 3000 milliseconds = 3 seconds
}


// =============================
// ADMIN SUMMARY (Load elections from backend)
// =============================

async function loadAdminSummary() {
    const token = localStorage.getItem('evote_token');
    if (!token) return;

    try {
        const res = await fetch(API_ORIGIN + '/api/admin/summary', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!res.ok) throw new Error('Failed to fetch summary');
        let data = await res.json();

        // Populate election selector if elections exist
        const electionSelect = document.getElementById("candElection");
        if (electionSelect && data.elections && data.elections.length > 0) {
            let html = '<option value="">Select Election</option>';
            data.elections.forEach(e => {
                html += `<option value="${e.id}">${e.name}</option>`;
            });
            electionSelect.innerHTML = html;
        }
    } catch (err) {
        console.error('Admin summary load error:', err);
    }
}

async function getElectionState() {
    try {
        if (!window.contract) await connectWallet();

        const electionId = await getActiveElectionId();
        if (electionId === null) return "not_started";

        const election = await window.contract.elections(electionId);

        const now = Math.floor(Date.now() / 1000);

        if (!election.exists) return "not_started";

        if (now < Number(election.startTime)) {
            return "not_started";
        }

        if (now >= Number(election.startTime) && now <= Number(election.endTime)) {
            return "started";
        }

        if (now > Number(election.endTime)) {
            return "ended";
        }

    } catch (err) {
        console.error("State fetch error:", err);
        return "not_started";
    }
}

// =============================
// ELECTION CONTROL LOGIC
// =============================

async function updateStatusDisplay() {

    const state = await getElectionState();
    const badge = document.getElementById("statusBadge");

    if (!badge) return;

    if (state === "not_started") {
        badge.innerText = "Not Started";
        badge.style.background = "#999";
    }
    else if (state === "started") {
        badge.innerText = "Ongoing";
        badge.style.background = "green";
    }
    else if (state === "ended") {
        badge.innerText = "Completed";
        badge.style.background = "red";
    }
}

function resetElection() {

    localStorage.removeItem("candidates");
    localStorage.removeItem("electionState");
    localStorage.removeItem("hasVoted");
    localStorage.removeItem("resultsPublishedAt");

    updateStatusDisplay();
    updateControlButtons();
    updateCandidateFormLock();

    localStorage.removeItem("electionState");
    async function updateElectionStatusRibbon() {
        const statusEl = document.getElementById("navStatus");
        if (!statusEl) return;

        try {
            const res = await fetch("/api/admin/status");
            const data = await res.json();

            if (data.status === "live") {
                statusEl.innerText = "🟢 Election Ongoing";
                statusEl.style.color = "green";
            }
            else if (data.status === "completed") {
                statusEl.innerText = "🔴 Election Completed";
                statusEl.style.color = "red";
            }
            else {
                statusEl.innerText = "⚪ Not Started";
                statusEl.style.color = "gray";
            }

        } catch (err) {
            statusEl.innerText = "⚠ Status Error";
        }
    }

    updateNavbar();
    updateElectionStatusRibbon();

    alert("Election Reset");
}

async function updateCandidateFormLock() {

    const state = await getElectionState();
    const form = document.getElementById("candidateForm");

    if (!form) return;

    const inputs = form.querySelectorAll("input, select, button");

    if (state === "started") {

        inputs.forEach(el => el.disabled = true);

        form.style.opacity = "0.6";
        form.style.pointerEvents = "none";

    } else {

        inputs.forEach(el => el.disabled = false);

        form.style.opacity = "1";
        form.style.pointerEvents = "auto";
    }
}

async function loadProposals() {
    const container = document.getElementById("proposalList");
    container.innerHTML = "Loading...";
    console.log("Loading proposals...");

    try {
        // Fix: Use the helper function from blockchain.js, not the raw contract
        const proposals = await getAllProposals();

        if (proposals.length === 0) {
            container.innerHTML = "No pending proposals";
            return;
        }

        container.innerHTML = "";

        proposals.forEach(p => {
            const div = document.createElement("div");
            const start = new Date(p.startTime * 1000).toLocaleString();
            const end = new Date(p.endTime * 1000).toLocaleString();

            div.innerHTML = `
                <div style="border:1px solid #ccc; padding:10px; margin:10px; border-radius: 6px; background: #fafafa;">
                    <b>${p.name}</b><br>
                    Start: ${start}<br>
                    End: ${end}<br><br>
                    <button onclick="approveProposal(${p.id})" style="background: var(--gov-saffron);">
                        Approve
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        container.innerHTML = "Error loading proposals";
        console.error(err);
    }
}

async function approveProposal(id) {
    try {
        if (!window.contract) await connectWallet();

        // 1. Send approval to Blockchain
        const tx = await window.contract.approveElection(id, {
            maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
            maxFeePerGas: ethers.parseUnits("40", "gwei")
        });
        await tx.wait();

        alert("Approved on Blockchain! Syncing with server...");

        // 2. 🔥 NEW: Tell the Web2 Backend to wake up and go "Live"!
        const token = localStorage.getItem("evote_token");
        if (token) {
            await fetch(API_ORIGIN +"/api/admin/start", {
                method: "POST",
                headers: { "Authorization": "Bearer " + token }
            });
        }

        // 3. Refresh the UI
        document.getElementById("proposalList").innerHTML = "Syncing with blockchain... Please wait.";
        setTimeout(() => {
            loadProposals();
        }, 3000);

    } catch (err) {
        alert(err.message);
    }
}