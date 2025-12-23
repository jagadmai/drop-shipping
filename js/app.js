// CART SYSTEM
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

// FAKE LIVE ORDERS
const names = ["John", "Alice", "Emma", "Liam", "Noah", "Olivia"];
const cities = ["NY", "LA", "Miami", "Chicago", "Dallas", "Seattle"];
const products = [
  "Smart LED Lights",
  "Wireless Charger",
  "Desk Lamp",
  "Bluetooth Speaker",
  "Smart Watch",
  "Portable Fan"
];

function showLiveOrder() {
  let name = names[Math.floor(Math.random() * names.length)];
  let city = cities[Math.floor(Math.random() * cities.length)];
  let product = products[Math.floor(Math.random() * products.length)];

  let live = document.getElementById("liveOrder");
  live.innerText = `${name} from ${city} just bought ${product}!`;
  live.classList.add("show");

  setTimeout(() => {
    live.classList.remove("show");
  }, 4000);
}

setInterval(showLiveOrder, Math.floor(Math.random() * 6000) + 6000);
