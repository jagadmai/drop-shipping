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

// PRODUCT DATA
const products = [
  {
    name: "Smart LED Lights",
    price: 29.99,
    img: "https://images.unsplash.com/photo-1593129836677-30229c3a1c16?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Wireless Charger",
    price: 24.99,
    img: "https://images.unsplash.com/photo-1612831455542-81e5f26c9f7c?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Desk Lamp",
    price: 19.99,
    img: "https://images.unsplash.com/photo-1602524205351-5f11be17b579?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Bluetooth Speaker",
    price: 49.99,
    img: "https://images.unsplash.com/photo-1580910051077-2b5f5b17c6b7?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Smart Watch",
    price: 79.99,
    img: "https://images.unsplash.com/photo-1599942263130-b2c77dfc045b?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Portable Fan",
    price: 14.99,
    img: "https://images.unsplash.com/photo-1581091870620-9f4a57d43287?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Wireless Earbuds",
    price: 59.99,
    img: "https://images.unsplash.com/photo-1606813905262-8c40ef1f585e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Gaming Mouse",
    price: 34.99,
    img: "https://images.unsplash.com/photo-1610428712993-60160f0b40c7?auto=format&fit=crop&w=400&q=80"
  }
];

// RENDER PRODUCTS
function renderProducts(list) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";
  list.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price}</div>
        <button class="buy" onclick="addToCart('${product.name}',${product.price})">Add to Cart</button>
      </div>
    `;
  });
}

// INITIAL LOAD
renderProducts(products);

// SEARCH FUNCTION
function filterProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(input));
  renderProducts(filtered);
}

// FAKE LIVE ORDERS
const names = ["John", "Alice", "Emma", "Liam", "Noah", "Olivia"];
const cities = ["NY", "LA", "Miami", "Chicago", "Dallas", "Seattle"];

function showLiveOrder() {
  let name = names[Math.floor(Math.random() * names.length)];
  let city = cities[Math.floor(Math.random() * cities.length)];
  let product = products[Math.floor(Math.random() * products.length)].name;

  let live = document.getElementById("liveOrder");
  live.innerText = `${name} from ${city} just bought ${product}!`;
  live.classList.add("show");

  setTimeout(() => {
    live.classList.remove("show");
  }, 4000);
}

setInterval(showLiveOrder, Math.floor(Math.random() * 6000) + 6000);
