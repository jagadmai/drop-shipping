let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function loadCart() {
  let list = document.getElementById("list");
  let total = 0;

  if (!list) return;

  if (cart.length === 0) {
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
  localStorage.setItem("orders", JSON.stringify(cart));
  localStorage.removeItem("cart");
  window.location.href = "success.html";
}
