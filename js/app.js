// ===== Account cart system =====
let cart = loadCartForUser();

// ===== Generate 1000 products =====
const products = [];
for(let i=1; i<=1000; i++){
  products.push({
    name: `Product ${i}`,
    price: (Math.random()*100+5).toFixed(2),
    img: `https://picsum.photos/seed/${i}/200/200`
  });
}

// ===== Lazy render products =====
let productsContainer = document.getElementById("productsContainer");
let productsPerLoad = 50; // load 50 at a time
let loadedCount = 0;

function renderProductsLazy() {
  if (!productsContainer) return;
  const slice = products.slice(loadedCount, loadedCount + productsPerLoad);
  slice.forEach(p => {
    productsContainer.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <div class="price">$${p.price}</div>
        <button class="buy" onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
      </div>
    `;
  });
  loadedCount += productsPerLoad;
}

// Initial render
renderProductsLazy();

// Load more on scroll
window.addEventListener('scroll', () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
    renderProductsLazy();
  }
});

// ===== Search =====
function filterProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(input));
  productsContainer.innerHTML = ""; // clear
  filtered.slice(0, loadedCount).forEach(p => {
    productsContainer.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <div class="price">$${p.price}</div>
        <button class="buy" onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
      </div>
    `;
  });
}

// ===== Cart Functions =====
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
    total += parseFloat(item.price);
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

// ===== Live Orders =====
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

// ===== Header update =====
function updateHeader() {
  const user = getCurrentUser();
  const userSection = document.getElementById("userSection");
  if (!userSection) return;
  if (user) userSection.innerHTML = `Welcome, ${user} | <a href="#" onclick="logout()">Logout</a> | <a href="cart.html">🛒 Cart</a>`;
  else userSection.innerHTML = `<a href="login.html">Login</a> | <a href="signup.html">Sign Up</a> | <a href="cart.html">🛒 Cart</a>`;
}
updateHeader();

// ===== Load cart if on cart page =====
if (document.getElementById("list")) loadCart();
