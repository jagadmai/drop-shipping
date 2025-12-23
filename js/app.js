let cart = loadCartForUser();

const products = [
  { name: "Smart LED Lights", price: 29.99, img: "https://images.unsplash.com/photo-1593129836677-30229c3a1c16?auto=format&fit=crop&w=400&q=80" },
  { name: "Wireless Charger", price: 24.99, img: "https://images.unsplash.com/photo-1612831455542-81e5f26c9f7c?auto=format&fit=crop&w=400&q=80" },
  { name: "Desk Lamp", price: 19.99, img: "https://images.unsplash.com/photo-1602524205351-5f11be17b579?auto=format&fit=crop&w=400&q=80" },
  { name: "Bluetooth Speaker", price: 49.99, img: "https://images.unsplash.com/photo-1580910051077-2b5f5b17c6b7?auto=format&fit=crop&w=400&q=80" },
  { name: "Smart Watch", price: 79.99, img: "https://images.unsplash.com/photo-1599942263130-b2c77dfc045b?auto=format&fit=crop&w=400&q=80" },
  { name: "Portable Fan", price: 14.99, img: "https://images.unsplash.com/photo-1581091870620-9f4a57d43287?auto=format&fit=crop&w=400&q=80" },
  { name: "Wireless Earbuds", price: 59.99, img: "https://images.unsplash.com/photo-1606813905262-8c40ef1f585e?auto=format&fit=crop&w=400&q=80" },
  { name: "Gaming Mouse", price: 34.99, img: "https://images.unsplash.com/photo-1610428712993-60160f0b40c7?auto=format&fit=crop&w=400&q=80" }
];

function renderProducts(list) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <div class="price">$${p.price}</div>
        <button class="buy" onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
      </div>
    `;
  });
}

renderProducts(products);

function filterProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(input)));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart(cart);
  alert(name + " added to cart!");
}

function loadCart() {
  const list = document.getElementById("list");
  if (!list) return;
  let total = 0;
  if (!cart || cart.length === 0) {
    list.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  cart.forEach(item => {
    list.innerHTML += `<p>${item.name} — $${item.price}</p>`;
    total += item.price;
  });
  document.getElementById("total").innerText = "Total: $" + total.toFixed(2);
}

function placeOrder() {
  const user = getCurrentUser();
  if (!user) return alert("Please login first!");
  localStorage.setItem("orders", JSON.stringify(cart));
  cart = [];
  saveCart(cart);
  window.location.href = "success.html";
}

const names = ["John","Alice","Emma","Liam","Noah","Olivia"];
const cities = ["NY","LA","Miami","Chicago","Dallas","Seattle"];

function showLiveOrder() {
  let name = names[Math.floor(Math.random()*names.length)];
  let city = cities[Math.floor(Math.random()*cities.length)];
  let product = products[Math.floor(Math.random()*products.length)].name;
  const live = document.getElementById("liveOrder");
  live.innerText = `${name} from ${city} just bought ${product}!`;
  live.classList.add("show");
  setTimeout(()=>live.classList.remove("show"),4000);
}

setInterval(showLiveOrder, Math.floor(Math.random()*6000)+6000);

function updateHeader() {
  const user = getCurrentUser();
  const userSection = document.getElementById("userSection");
  if (!userSection) return;
  if (user) userSection.innerHTML = `Welcome, ${user} | <a href="#" onclick="logout()">Logout</a>`;
  else userSection.innerHTML = `<a href="login.html">Login</a> | <a href="signup.html">Sign Up</a>`;
}
updateHeader();
