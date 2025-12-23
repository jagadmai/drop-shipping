function signup() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (!user || !pass) return alert("Enter both fields.");
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[user]) return alert("Username exists!");
  users[user] = { password: pass, cart: [] };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", user);
  alert("Account created! Logged in as " + user);
  window.location.href = "index.html";
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  if (!users[user] || users[user].password !== pass) return alert("Invalid credentials");
  localStorage.setItem("currentUser", user);
  alert("Logged in as " + user);
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged out!");
  window.location.href = "login.html";
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function saveCart(cart) {
  const user = getCurrentUser();
  if (!user) return;
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  users[user].cart = cart;
  localStorage.setItem("users", JSON.stringify(users));
}

function loadCartForUser() {
  const user = getCurrentUser();
  if (!user) return [];
  let users = JSON.parse(localStorage.getItem("users") || "{}");
  return users[user].cart || [];
}
