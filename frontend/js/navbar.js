document.addEventListener("DOMContentLoaded", function () {
  updateNavbar();
});

async function updateNavbar() {
  const token = localStorage.getItem("evote_token");
  const navStatus = document.getElementById("navStatus");
  const navUser = document.getElementById("navUser");
  const logoutBtn = document.getElementById("logoutBtn");

  // If no one is logged in, hide everything
  if (!token) {
    if (navStatus) navStatus.innerText = "";
    if (navUser) navUser.innerText = "";
    if (logoutBtn) logoutBtn.style.display = "none";
    return;
  }

  // 1. Determine User Status
  const verifiedVoterId = localStorage.getItem("verifiedVoterId");
  const sessionRole = localStorage.getItem("sessionRole");

  let userText = "Session active";
  let userLabel = "User";

  if (verifiedVoterId) {
    userText = "Signed in";
    userLabel = "Voter " + verifiedVoterId;
  } else if (sessionRole === "admin") {
    userText = "Admin Access";
    userLabel = "Administrator";
  }

  // 2. Determine Election Status from the Backend Clock!
  let electionText = "🟢 Not Started";
  let color = "gray";

  try {
    // 🛑 BYPASS WEB2: Ask the blockchain directly if it's loaded!
    if (window.contract && typeof getActiveElectionId === "function") {
      const activeId = await getActiveElectionId();
      if (activeId !== null) {
        electionText = "🟢 Ongoing";
        color = "green";
      } else {
        electionText = "🔴 Ended";
        color = "red";
      }
    } else {
      // Default to green if we are on a page where blockchain isn't checking yet
      electionText = "🟢 Ongoing";
      color = "green";
    }
  } catch (err) {
    electionText = "🟢 Ongoing";
    color = "green";
  }

  // 3. Update the UI
  if (navStatus) {
    navStatus.innerText = `${electionText} | ${userText}`;
    navStatus.style.color = color;
  }

  if (navUser) {
    navUser.innerText = userLabel;
  }

  if (logoutBtn) {
    logoutBtn.style.display = "inline";
  }
}

function logout() {
  localStorage.clear(); // This safely wipes out all old ghost data!
  sessionStorage.clear();
  window.location.href = "index.html";
}

function goToVoting() {
  window.location.href = "verify.html"; // Skips language page directly
}