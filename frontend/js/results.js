const API_ORIGIN = "";

window.onload = function () {
  loadResults();
};

async function loadResults() {
  try {
    const res = await fetch("/api/spectator/results");
    const response = await res.json();
    const data = response.results;

    const container = document.getElementById("resultsContainer");
    container.innerHTML = "";

    data.forEach(candidate => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${candidate.name}</h3>
        <p>Votes: ${candidate.votes}</p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Error loading results:", err);
  }
}

async function canShowResults() {
  if (!window.contract) await connectWallet();

  const electionId = await getActiveElectionId();
  if (electionId === null) return false;

  const election = await window.contract.elections(electionId);

  const now = Math.floor(Date.now() / 1000);

  if (now <= Number(election.revealEndTime)) {
    return false; // ❌ reveal phase not over
  }

  return true; // ✅ safe to show results
}

window.onload = async function () {
  const allowed = await canShowResults();

  if (!allowed) {
    document.getElementById("resultsContainer").innerHTML =
      "Results not available yet.";
    return;
  }

  loadResults();
};