// ===== Account cart system =====
let cart = loadCartForUser();

// ===== Generate 1000 products =====
const products = [
  {
    name: "Apple iPhone 14 Pro",
    price: 999.99,
    img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    price: 1199.99,
    img: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"
  },
  {
    name: "MacBook Pro 16\"",
    price: 2499.99,
    img: "https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg"
  },
  {
    name: "Dell XPS 13",
    price: 1399.99,
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
  },
  {
    name: "Sony WH‑1000XM5 Headphones",
    price: 349.99,
    img: "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg"
  },
  {
    name: "Bose QuietComfort Earbuds",
    price: 279.99,
    img: "https://images.pexels.com/photos/3770255/pexels-photo-3770255.jpeg"
  },
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    img: "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg"
  },
  {
    name: "Samsung Galaxy Watch 6",
    price: 349.99,
    img: "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg"
  },
  {
    name: "Google Pixel 7",
    price: 599.99,
    img: "https://images.pexels.com/photos/5077041/pexels-photo-5077041.jpeg"
  },
  {
    name: "OnePlus 11",
    price: 699.99,
    img: "https://images.pexels.com/photos/5077041/pexels-photo-5077041.jpeg"
  },
  {
    name: "iPad Pro 12.9\"",
    price: 1099.99,
    img: "https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg"
  },
  {
    name: "Amazon Fire HD 10",
    price: 149.99,
    img: "https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg"
  },
  {
    name: "Sony PlayStation 5",
    price: 499.99,
    img: "https://images.pexels.com/photos/845745/pexels-photo-845745.jpeg"
  },
  {
    name: "Microsoft Xbox Series X",
    price: 499.99,
    img: "https://images.pexels.com/photos/845745/pexels-photo-845745.jpeg"
  },
  {
    name: "Nintendo Switch",
    price: 299.99,
    img: "https://images.pexels.com/photos/4109129/pexels-photo-4109129.jpeg"
  },
  {
    name: "GoPro HERO11",
    price: 399.99,
    img: "https://images.pexels.com/photos/276467/pexels-photo-276467.jpeg"
  },
  {
    name: "DJI Mini 3 Pro",
    price: 759.99,
    img: "https://images.pexels.com/photos/1459428/pexels-photo-1459428.jpeg"
  },
  {
    name: "Fitbit Versa 4",
    price: 229.99,
    img: "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg"
  },
  {
    name: "JBL Charge 5 Speaker",
    price: 179.99,
    img: "https://images.pexels.com/photos/63703/pexels-photo-63703.jpeg"
  },
  {
    name: "Anker Portable Charger",
    price: 59.99,
    img: "https://images.pexels.com/photos/4498369/pexels-photo-4498369.jpeg"
  },
  {
    name: "Logitech MX Master 3",
    price: 99.99,
    img: "https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg"
  },
  {
    name: "Razer BlackWidow Keyboard",
    price: 129.99,
    img: "https://images.pexels.com/photos/3945681/pexels-photo-3945681.jpeg"
  },
  {
    name: "Apple AirPods Pro 2",
    price: 249.99,
    img: "https://images.pexels.com/photos/3394653/pexels-photo-3394653.jpeg"
  },
  {
    name: "Samsung Galaxy Buds 2 Pro",
    price: 229.99,
    img: "https://images.pexels.com/photos/3770255/pexels-photo-3770255.jpeg"
  },
  {
    name: "HP Envy Laptop",
    price: 999.99,
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
  }
];


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
