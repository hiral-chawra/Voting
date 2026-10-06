// ===== admin.js safety patch (paste at TOP) =====
const API_ORIGIN = "";

// ----------- Admin login logic -----------
async function loginAdmin() {
  const voterId = document.getElementById("adminId").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ voterId, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    // store token + role
    localStorage.setItem("evote_token", data.token);
    localStorage.setItem("sessionRole", data.user.role);

    // redirect
    window.location.href = "admin.html";

  } catch (err) {
    alert(err.message);
  }
}

async function startElectionAPI() {
  const token = localStorage.getItem("evote_token");

  const res = await fetch(API_ORIGIN +"/api/admin/start", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();
  alert(data.message);
}

async function stopElectionAPI() {
  const token = localStorage.getItem("evote_token");

  const res = await fetch("/api/admin/stop", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();
  alert(data.message);
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}
