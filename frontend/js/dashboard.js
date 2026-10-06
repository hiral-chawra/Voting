const API_ORIGIN = "";

window.onload = function () {
  loadDashboard();
};

async function loadDashboard() {
  try {
    const res = await fetch("/api/spectator/results");
    const data = await res.json();

    const results = data.results;
    let totalVotes = 0;

    results.forEach(c => {
      totalVotes += c.votes;
    });

    // DYNAMIC FIX: Use the real number from our backend API
    const totalVoters = data.totalVoters || 0;

    document.getElementById("totalVoters").innerText = totalVoters;
    document.getElementById("votesCast").innerText = totalVotes;

    const percentage = totalVoters > 0
       ? ((totalVotes / totalVoters) * 100).toFixed(2)
       : 0;

    document.getElementById("turnout").innerText = percentage + "%";
  } catch (err) {
    console.error("Dashboard error:", err);
  }
}

async function loadStatus() {
    const res = await fetch("/api/admin/status");
    const data = await res.json();

    document.getElementById("electionStatus").innerText = data.status;
}
