// Replace existing cart system with per-account cart
let cart = loadCartForUser();

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart(cart);
  alert(name + " added to cart!");
}

function loadCart() {
  let list = document.getElementById("list");
  let total = 0;

  if (!list) return;

  if (!cart || cart.length === 0) {
    list.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    list.innerHTML += `<p>${item.name} — $${item.price}</p>`;
    total += item.price;
  });

  document.getElementById("total").innerText =
    "Total: $" + total.toFixed(2);
}

function placeOrder() {
  const user = getCurrentUser();
  if (!user) return alert("Please login first!");

  localStorage.setItem("orders", JSON.stringify(cart));
  cart = [];
  saveCart(cart);
  window.location.href = "success.html";
}

