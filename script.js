const products = [
  {
    id: 1,
    name: "Luna Sofa",
    category: "sofa",
    price: 184900,
    oldPrice: 219900,
    badge: "New",
    rating: 4.9,
    description: "Роскошный диван с мягкой спинкой из велюра и глубокими подлокотниками.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Harbor Chair",
    category: "chair",
    price: 58200,
    oldPrice: 68900,
    badge: "Bestseller",
    rating: 4.8,
    description: "Современное кресло с фигурной спинкой и натуральной кожей.",
    image:
      "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Aster Table",
    category: "table",
    price: 124500,
    oldPrice: 149000,
    badge: "Top",
    rating: 4.9,
    description: "Обеденный стол из массива дуба с эффектной столешницей в теплых тонах.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Aurel Lamp",
    category: "lighting",
    price: 21400,
    oldPrice: 26500,
    badge: "Popular",
    rating: 4.7,
    description: "Лампа с мягким светом для уютного вечернего интерьера.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Linea Bed",
    category: "sofa",
    price: 231000,
    oldPrice: 273000,
    badge: "Exclusive",
    rating: 5.0,
    description: "Кровать с мягким изголовьем и добротной конструкцией для идеального сна.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Solstice Lounge",
    category: "chair",
    price: 69500,
    oldPrice: 82500,
    badge: "Limited",
    rating: 4.9,
    description: "Плавные линии и оттоманка на выбор для отдыха и чтения.",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Noir Console",
    category: "table",
    price: 96900,
    oldPrice: 112000,
    badge: "Editor’s Pick",
    rating: 4.8,
    description: "Консоль для прихожей и гостиной с массивным корпусом и минималистичным дизайном.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Halo Pendant",
    category: "lighting",
    price: 27800,
    oldPrice: 33200,
    badge: "Designer",
    rating: 4.7,
    description: "Потолочная люстра в мягком золотом покрытии для роскошной атмосферы.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
  },
];

const productsGrid = document.getElementById("productsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartBadge = document.getElementById("cartBadge");
const cartTotal = document.getElementById("cartTotal");
const yearTarget = document.getElementById("year");

let activeFilter = "all";
let cart = [];

const formatPrice = (value) => `${value.toLocaleString("ru-RU")} ₽`;

function renderProducts(filter = "all") {
  const filtered = filter === "all" ? products : products.filter((item) => item.category === filter);

  productsGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <span class="product-badge">${product.badge}</span>
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-body">
            <div class="product-top">
              <h3>${product.name}</h3>
            </div>
            <div class="product-meta">
              <span>★ ${product.rating}</span>
              <span>${product.category}</span>
            </div>
            <div class="price-row">
              <span class="price">${formatPrice(product.price)}</span>
              <span class="old-price">${formatPrice(product.oldPrice)}</span>
            </div>
            <p>${product.description}</p>
            <div class="product-actions">
              <button type="button" class="add-to-cart" data-id="${product.id}">В корзину</button>
              <button type="button" class="wish" aria-label="Добавить в избранное">♡</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      addToCart(id);
    });
  });
}

function addToCart(productId) {
  const found = products.find((product) => product.id === productId);
  if (!found) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...found, quantity: 1 });
  }

  updateCart();
  cartDrawer.classList.add("open");
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = formatPrice(totalPrice);

  cartItems.innerHTML =
    cart.length === 0
      ? '<p style="color: #6d5a52; line-height:1.7;">Ваша корзина пока пуста.</p>'
      : cart
          .map(
            (item) => `
              <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" />
                <div class="meta">
                  <strong>${item.name}</strong>
                  <span>${formatPrice(item.price)}</span>
                  <small class="qty">Количество: ${item.quantity}</small>
                </div>
                <button class="remove-item" data-id="${item.id}" aria-label="Удалить товар">Удалить</button>
              </div>
            `
          )
          .join("");

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      cart = cart.filter((item) => item.id !== id);
      updateCart();
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));
    renderProducts(activeFilter);
  });
});

document.querySelector(".cart-trigger").addEventListener("click", () => {
  cartDrawer.classList.toggle("open");
});

document.querySelector(".close-cart").addEventListener("click", () => {
  cartDrawer.classList.remove("open");
});

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

renderProducts();
updateCart();
