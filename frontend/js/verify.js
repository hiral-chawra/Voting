const API_ORIGIN = "";

window.onload = function () {
  const token = localStorage.getItem("evote_token");
  const verifiedVoterId = localStorage.getItem("verifiedVoterId");
  if (token && verifiedVoterId) window.location.href = "vote.html";
};

async function verifyVoter() {
  const voterId = document.getElementById("voterId").value.trim();
  const password = document.getElementById("voterPassword").value.trim();
  if (!voterId || !password) return alert("Please enter Voter ID and password");

  try {
    const res = await fetch(API_ORIGIN + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voterId, password }),
    });

    const data = await safeJson(res);

    // fetch() doesn’t reject on HTTP status errors; check ok. citeturn0search1
    if (!res.ok) {
      const msg = (data && (data.error || data.message)) || res.statusText || "Login failed";
      return alert("Verification failed: " + msg);
    }

    if (!data || !data.token) return alert("Login succeeded but no token returned");

    localStorage.setItem("evote_token", data.token);
    localStorage.setItem("verifiedVoterId", voterId);

    sessionStorage.removeItem("hasVoted");
    sessionStorage.removeItem("vote_receipt");

    window.location.href = "vote.html";
  } catch (err) {
    alert("Verification request failed: " + err.message);
  }
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
