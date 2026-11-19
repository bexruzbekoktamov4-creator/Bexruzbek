/* ==========================================================================
   OLOV GRILL — VANILLA JAVASCRIPT APPLICATION
   Features: Menu Catalog, Category Filter, Search, Sort, Shopping Cart,
   Checkout, Account (Register/Login/Profile/Orders), Contact Form, LocalStorage
   ========================================================================== */

const STORAGE_KEYS = {
  CART: "olovgrill_cart_v1",
  USERS: "olovgrill_users_v1",
  CURRENT_USER: "olovgrill_current_user_v1",
  ORDERS: "olovgrill_orders_v1",
  MESSAGES: "olovgrill_messages_v1"
};

const CATEGORY_LABELS = {
  all: "Barchasi",
  burger: "Burgerlar",
  lavash: "Lavashlar",
  pizza: "Pitsalar",
  hotdog: "Hot-doglar",
  fries: "Fri kartoshka",
  nuggets: "Nuggets",
  sandwich: "Sendvichlar",
  dessert: "Shirinliklar",
  drink: "Ichimliklar"
};

const PRODUCTS = [
  // BURGERLAR
  {
    id: "burger-cheeseburger",
    name: "Cheeseburger",
    category: "burger",
    price: 34000,
    popular: true,
    badge: "Mashhur",
    description: "Shirali mol go‘shti kotleti, eritilgan cheddar pishlog‘i, marinadlangan bodring, piyoz va maxsus gril sousi.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "burger-hamburger",
    name: "Hamburger",
    category: "burger",
    price: 29000,
    popular: false,
    badge: "",
    description: "Klassik yumshoq bulochka, olovda pishirilgan mol go‘shti, yangi pomidor, salat bargi va firma sousi.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "burger-double",
    name: "Double Burger",
    category: "burger",
    price: 46000,
    popular: true,
    badge: "Xit",
    description: "Ikki qavatli mol go‘shti kotleti, ikki hissa pishloq, qarsildoq piyoz halqalari va tutunli barbekyu sousi.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "burger-chicken",
    name: "Chicken Burger",
    category: "burger",
    price: 31000,
    popular: false,
    badge: "Yangi",
    description: "Tashqarisi qarsildoq, ichi shirador tovuq filesi, aysberg karami va sarimsoqli qaymoq sousi.",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=700&q=80"
  },

  // LAVASHLAR
  {
    id: "lavash-oddiy",
    name: "Oddiy lavash",
    category: "lavash",
    price: 28000,
    popular: true,
    badge: "Mashhur",
    description: "Yangi pishirilgan yupqa lavash xamirida gril mol go‘shti, pomidor, chips, ko‘katlar va oq sous.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "lavash-pishloqli",
    name: "Pishloqli lavash",
    category: "lavash",
    price: 33000,
    popular: true,
    badge: "Top tanlov",
    description: "Issiq mol go‘shti, mayin pishloq bo‘laklari, pomidor, chips va boy ta’mli maxsus lavash sousi.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "lavash-big",
    name: "Big lavash",
    category: "lavash",
    price: 39000,
    popular: false,
    badge: "Katta porsiya",
    description: "Kattalashtirilgan porsiya: ko‘proq mol go‘shti, pishloq, qarsildoq kartoshka va ikki xil sous.",
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=700&q=80"
  },

  // PITSALAR
  {
    id: "pizza-margherita",
    name: "Margherita",
    category: "pizza",
    price: 58000,
    popular: false,
    badge: "",
    description: "Yupqa italyan xamiri, tabiiy pomidor sousi, ko‘p miqdorda mozzarella pishlog‘i va rayhon barglari.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "pizza-pepperoni",
    name: "Pepperoni",
    category: "pizza",
    price: 69000,
    popular: true,
    badge: "Xit",
    description: "Xushbo‘y pepperoni kolbasasi, eritilgan mozzarella pishlog‘i va maxsus tomat-ziravorli sous.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "pizza-chicken",
    name: "Chicken Pizza",
    category: "pizza",
    price: 65000,
    popular: false,
    badge: "",
    description: "Grilda qovurilgan tovuq go‘shti, qo‘ziqorin, qizil bulg‘or qalampiri, mozzarella va oq sous.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80"
  },

  // HOT-DOGLAR
  {
    id: "hotdog-classic",
    name: "Klassik Hot-Dog",
    category: "hotdog",
    price: 22000,
    popular: false,
    badge: "",
    description: "Yumshoq bulochka, suvli sosiska, ketchup, gorchitsa, mayonez va mayda to‘g‘ralgan piyoz.",
    image: "https://images.unsplash.com/photo-1612392062631-94dd858cb88f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "hotdog-cheese",
    name: "Pishloqli Hot-Dog",
    category: "hotdog",
    price: 27000,
    popular: false,
    badge: "Yangi",
    description: "Issiq pishloq sousi bilan boyitilgan maxsus hot-dog, qarsildoq piyoz va xalapeno bo‘laklari.",
    image: "https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=700&q=80"
  },

  // FRI KARTOSHKA
  {
    id: "fries-classic",
    name: "Fri kartoshka (Klassik)",
    category: "fries",
    price: 18000,
    popular: true,
    badge: "Mashhur",
    description: "Tilla rangda qovurilgan, tashqarisi qarsildoq va ichi yumshoq saralangan kartoshka bo‘laklari.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "fries-cheese",
    name: "Pishloqli Fri Kartoshka",
    category: "fries",
    price: 24000,
    popular: false,
    badge: "",
    description: "Issiq fri kartoshka ustidan quyilgan quyuq cheddar pishloq sousi va ko‘katlar.",
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80"
  },

  // NUGGETS
  {
    id: "nuggets-6",
    name: "Tovuq Nuggets (6 dona)",
    category: "nuggets",
    price: 23000,
    popular: false,
    badge: "",
    description: "100% tabiiy tovuq go‘shtidan tayyorlangan, qarsildoq qobiqli 6 dona nuggets.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "nuggets-12",
    name: "Tovuq Nuggets (12 dona)",
    category: "nuggets",
    price: 41000,
    popular: false,
    badge: "Do‘stlar uchun",
    description: "12 dona qarsildoq tovuq naggetsi va tanlov asosida 2 xil sous bilan.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80"
  },

  // SENDVICHLAR
  {
    id: "sandwich-club",
    name: "Club Sendvich",
    category: "sandwich",
    price: 32000,
    popular: false,
    badge: "",
    description: "Tosterda qovurilgan non, tovuq filesi, tuxum, pishloq, pomidor, bodring va maxsus sous.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "sandwich-beef",
    name: "Gril Go‘shtli Sendvich",
    category: "sandwich",
    price: 36000,
    popular: false,
    badge: "",
    description: "Qovurilgan mol go‘shti tilimlari, karamelizatsiyalangan piyoz, pishloq va xantal-asal sousi.",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=700&q=80"
  },

  // SHIRINLIKLAR
  {
    id: "dessert-brownie",
    name: "Shokoladli Brownie",
    category: "dessert",
    price: 25000,
    popular: false,
    badge: "Shirinlik",
    description: "Boylari yumshoq va ichi shokoladga boy klassik brownie pirogi.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "dessert-cheesecake",
    name: "San-Sebastian Chizkeyk",
    category: "dessert",
    price: 32000,
    popular: true,
    badge: "Top shirinlik",
    description: "Karamellashgan ustki qavat va nihoyatda mayin pishloqli kremli chizkeyk.",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"
  },

  // ICHIMLIKLAR
  {
    id: "drink-cocacola",
    name: "Coca-Cola (0.5L)",
    category: "drink",
    price: 11000,
    popular: false,
    badge: "",
    description: "Muzdek gazlangan Coca-Cola ichimligi — taomlar bilan mukammal uyg‘unlik.",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "drink-pepsi",
    name: "Pepsi (0.5L)",
    category: "drink",
    price: 11000,
    popular: false,
    badge: "",
    description: "Tetiklantiruvchi sovuq Pepsi ichimligi.",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "drink-fanta",
    name: "Fanta Apelsin (0.5L)",
    category: "drink",
    price: 11000,
    popular: false,
    badge: "",
    description: "Apelsin ta’mli yorqin va tetiklantiruvchi gazlangan ichimlik.",
    image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "drink-sprite",
    name: "Sprite (0.5L)",
    category: "drink",
    price: 11000,
    popular: false,
    badge: "",
    description: "Limon va laym ta’mli muzdek tetiklantiruvchi ichimlik.",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "drink-juice",
    name: "Tabiiy Meva Sharbati",
    category: "drink",
    price: 14000,
    popular: false,
    badge: "Tabiiy",
    description: "Olma, shaftoli yoki multimevali tabiiy sharbat (0.33L).",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "drink-water",
    name: "Gazsiz Mineral Suv (0.5L)",
    category: "drink",
    price: 6000,
    popular: false,
    badge: "",
    description: "Toza tabiiy ichimlik suvi.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=700&q=80"
  }
];

// ==========================================================================
// STATE & LOCALSTORAGE HELPERS
// ==========================================================================
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error("LocalStorage read error:", err);
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("LocalStorage write error:", err);
  }
}

const state = {
  category: "all",
  search: "",
  sort: "default",
  cart: loadFromStorage(STORAGE_KEYS.CART, []),
  users: loadFromStorage(STORAGE_KEYS.USERS, []),
  currentUser: loadFromStorage(STORAGE_KEYS.CURRENT_USER, null),
  orders: loadFromStorage(STORAGE_KEYS.ORDERS, [])
};

function formatUZS(amount) {
  const num = Number(amount) || 0;
  return `${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so‘m`;
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const iconClass =
    type === "success"
      ? "fa-circle-check"
      : type === "error"
      ? "fa-circle-exclamation"
      : "fa-fire-flame-curved";

  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 260);
  }, 2800);
}

// ==========================================================================
// PRODUCT RENDERING, FILTERING, SEARCH & SORT
// ==========================================================================
function createProductCardHTML(product) {
  const badgeHTML = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : "";
  const catName = CATEGORY_LABELS[product.category] || product.category;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${badgeHTML}
        <span class="product-cat-pill">${catName}</span>
      </div>
      <div class="product-body">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatUZS(product.price)}</span>
          <button type="button" class="add-to-cart-btn" data-add-id="${product.id}">
            <i class="fa-solid fa-cart-plus"></i>
            <span>Savatga</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderPopularProducts() {
  const popularGrid = document.getElementById("popularProductsGrid");
  if (!popularGrid) return;

  const popularItems = PRODUCTS.filter((item) => item.popular);
  popularGrid.innerHTML = popularItems.map(createProductCardHTML).join("");
}

function getFilteredAndSortedProducts() {
  const query = state.search.trim().toLowerCase();

  let filtered = PRODUCTS.filter((item) => {
    const matchesCategory =
      state.category === "all" || item.category === state.category;

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (CATEGORY_LABELS[item.category] || "").toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (state.sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (state.sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (state.sort === "name-asc") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "uz"));
  }

  return filtered;
}

function renderMenuProducts() {
  const menuGrid = document.getElementById("menuProductsGrid");
  const emptyState = document.getElementById("emptyMenuState");
  const resultsCount = document.getElementById("resultsCount");

  if (!menuGrid || !emptyState || !resultsCount) return;

  const items = getFilteredAndSortedProducts();
  const catLabel = CATEGORY_LABELS[state.category] || "Barchasi";

  resultsCount.textContent = `Kategoriya: ${catLabel} — ${items.length} ta mahsulot topildi`;

  if (items.length === 0) {
    menuGrid.innerHTML = "";
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
    menuGrid.innerHTML = items.map(createProductCardHTML).join("");
  }
}

function initMenuControls() {
  const categoryTabs = document.getElementById("categoryTabs");
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const sortSelect = document.getElementById("sortSelect");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");

  if (categoryTabs) {
    categoryTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".cat-btn");
      if (!btn) return;

      categoryTabs
        .querySelectorAll(".cat-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      state.category = btn.dataset.category || "all";
      renderMenuProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.search = e.target.value;
      renderMenuProducts();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.search = "";
      renderMenuProducts();
      searchInput.focus();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      renderMenuProducts();
    });
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      state.category = "all";
      state.search = "";
      state.sort = "default";
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "default";
      if (categoryTabs) {
        categoryTabs.querySelectorAll(".cat-btn").forEach((b) => {
          b.classList.toggle("active", b.dataset.category === "all");
        });
      }
      renderMenuProducts();
    });
  }

  // Event delegation for Add to Cart across Popular & Menu grids
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-id]");
    if (!addBtn) return;

    const productId = addBtn.dataset.addId;
    addToCart(productId);

    addBtn.classList.add("added");
    const originalHTML = addBtn.innerHTML;
    addBtn.innerHTML = `<i class="fa-solid fa-check"></i><span>Qo‘shildi</span>`;
    setTimeout(() => {
      addBtn.classList.remove("added");
      addBtn.innerHTML = originalHTML;
    }, 850);
  });
}

// ==========================================================================
// SHOPPING CART LOGIC
// ==========================================================================
function persistCart() {
  saveToStorage(STORAGE_KEYS.CART, state.cart);
  updateCartUI();
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  persistCart();
  showToast(`"${product.name}" savatchaga qo‘shildi`, "success");
}

function changeCartQty(productId, delta) {
  const target = state.cart.find((item) => item.id === productId);
  if (!target) return;

  target.qty += delta;
  if (target.qty <= 0) {
    state.cart = state.cart.filter((item) => item.id !== productId);
  }
  persistCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId);
  persistCart();
  showToast("Mahsulot savatchadan o‘chirildi", "info");
}

function getCartTotals() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  return { totalQty, totalPrice };
}

function updateCartUI() {
  const cartCountEl = document.getElementById("cartCount");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartTotalQtyEl = document.getElementById("cartTotalQty");
  const cartTotalPriceEl = document.getElementById("cartTotalPrice");
  const proceedCheckoutBtn = document.getElementById("proceedCheckoutBtn");

  const { totalQty, totalPrice } = getCartTotals();

  if (cartCountEl) cartCountEl.textContent = totalQty;
  if (cartTotalQtyEl) cartTotalQtyEl.textContent = `${totalQty} ta`;
  if (cartTotalPriceEl) cartTotalPriceEl.textContent = formatUZS(totalPrice);

  if (proceedCheckoutBtn) {
    proceedCheckoutBtn.disabled = state.cart.length === 0;
    proceedCheckoutBtn.style.opacity = state.cart.length === 0 ? "0.5" : "1";
  }

  if (!cartItemsContainer) return;

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Savatchangiz bo‘sh</h4>
        <p>Menyudan o‘zingizga yoqqan taomlarni tanlang va savatchaga qo‘shing.</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = state.cart
    .map(
      (item) => `
      <div class="cart-item" data-cart-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-unit">${formatUZS(item.price)} / dona</div>
          <div class="cart-item-bottom">
            <div class="qty-controls">
              <button type="button" class="qty-btn" data-qty-minus="${item.id}" aria-label="Kamaytirish">−</button>
              <span class="qty-value">${item.qty}</span>
              <button type="button" class="qty-btn" data-qty-plus="${item.id}" aria-label="Ko‘paytirish">+</button>
            </div>
            <span class="cart-item-subtotal">${formatUZS(item.price * item.qty)}</span>
          </div>
        </div>
        <button type="button" class="remove-item-btn" data-remove-id="${item.id}" title="O‘chirish">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `
    )
    .join("");
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer && backdrop) {
    drawer.classList.add("open");
    backdrop.classList.remove("hidden");
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("open");
    backdrop.classList.add("hidden");
  }
}

function initCartEvents() {
  document
    .getElementById("openCartBtn")
    ?.addEventListener("click", openCartDrawer);
  document
    .getElementById("closeCartBtn")
    ?.addEventListener("click", closeCartDrawer);
  document
    .getElementById("cartBackdrop")
    ?.addEventListener("click", closeCartDrawer);

  document
    .getElementById("cartItemsContainer")
    ?.addEventListener("click", (e) => {
      const minusBtn = e.target.closest("[data-qty-minus]");
      const plusBtn = e.target.closest("[data-qty-plus]");
      const removeBtn = e.target.closest("[data-remove-id]");

      if (minusBtn) changeCartQty(minusBtn.dataset.qtyMinus, -1);
      if (plusBtn) changeCartQty(plusBtn.dataset.qtyPlus, 1);
      if (removeBtn) removeFromCart(removeBtn.dataset.removeId);
    });

  document
    .getElementById("proceedCheckoutBtn")
    ?.addEventListener("click", () => {
      if (state.cart.length === 0) {
        showToast("Savatcha bo‘sh! Avval mahsulot tanlang.", "error");
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
}

// ==========================================================================
// CHECKOUT LOGIC
// ==========================================================================
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  const backdrop = document.getElementById("checkoutBackdrop");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutSummary = document.querySelector(".checkout-summary");
  const successBox = document.getElementById("orderSuccessBox");
  const itemsListEl = document.getElementById("checkoutItemsList");
  const totalEl = document.getElementById("checkoutTotalAmount");

  if (!modal || !backdrop) return;

  checkoutForm?.classList.remove("hidden");
  checkoutSummary?.classList.remove("hidden");
  successBox?.classList.add("hidden");

  if (state.currentUser) {
    const nameInput = document.getElementById("checkoutFullName");
    const phoneInput = document.getElementById("checkoutPhone");
    if (nameInput && !nameInput.value) nameInput.value = state.currentUser.name || "";
    if (phoneInput && !phoneInput.value) phoneInput.value = state.currentUser.phone || "";
  }

  const { totalPrice } = getCartTotals();
  if (itemsListEl) {
    itemsListEl.innerHTML = state.cart
      .map(
        (item) => `
        <div class="checkout-line">
          <span>${item.name} × ${item.qty}</span>
          <strong>${formatUZS(item.price * item.qty)}</strong>
        </div>
      `
      )
      .join("");
  }
  if (totalEl) totalEl.textContent = formatUZS(totalPrice);

  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal")?.classList.add("hidden");
  document.getElementById("checkoutBackdrop")?.classList.add("hidden");
}

function initCheckoutEvents() {
  document
    .getElementById("closeCheckoutBtn")
    ?.addEventListener("click", closeCheckoutModal);
  document
    .getElementById("checkoutBackdrop")
    ?.addEventListener("click", closeCheckoutModal);

  const checkoutForm = document.getElementById("checkoutForm");
  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (state.cart.length === 0) {
      showToast("Savatcha bo‘sh!", "error");
      return;
    }

    const fullName = document.getElementById("checkoutFullName")?.value.trim();
    const phone = document.getElementById("checkoutPhone")?.value.trim();
    const address = document.getElementById("checkoutAddress")?.value.trim();
    const note = document.getElementById("checkoutNote")?.value.trim();

    if (!fullName || !phone || !address) {
      showToast("Iltimos, barcha majburiy maydonlarni to‘ldiring!", "error");
      return;
    }

    const { totalQty, totalPrice } = getCartTotals();
    const orderNumber = `#OG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: orderNumber,
      userEmail: state.currentUser ? state.currentUser.email : null,
      userPhone: state.currentUser ? state.currentUser.phone : phone,
      fullName,
      phone,
      address,
      note,
      items: state.cart.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty
      })),
      totalQty,
      totalPrice,
      status: "Qabul qilindi",
      createdAt: new Date().toLocaleString("uz-UZ")
    };

    state.orders.unshift(newOrder);
    saveToStorage(STORAGE_KEYS.ORDERS, state.orders);

    // Clear cart
    state.cart = [];
    persistCart();

    // Show success screen
    checkoutForm.classList.add("hidden");
    document.querySelector(".checkout-summary")?.classList.add("hidden");
    const successBox = document.getElementById("orderSuccessBox");
    const successOrderId = document.getElementById("successOrderId");
    if (successOrderId) successOrderId.textContent = orderNumber;
    successBox?.classList.remove("hidden");

    checkoutForm.reset();
    showToast("Buyurtmangiz muvaffaqiyatli qabul qilindi!", "success");
  });

  document.getElementById("closeSuccessBtn")?.addEventListener("click", () => {
    closeCheckoutModal();
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("viewMyOrdersBtn")?.addEventListener("click", () => {
    closeCheckoutModal();
    openAccountModal("orders");
  });
}

// ==========================================================================
// ACCOUNT SYSTEM (REGISTER, LOGIN, LOGOUT, PROFILE, ORDERS HISTORY)
// ==========================================================================
function updateAccountHeaderUI() {
  const btn = document.getElementById("openAccountBtn");
  const label = document.getElementById("accountBtnLabel");
  if (!btn || !label) return;

  if (state.currentUser) {
    btn.classList.add("logged-in");
    label.textContent = state.currentUser.name.split(" ")[0];
  } else {
    btn.classList.remove("logged-in");
    label.textContent = "Kirish";
  }
}

function renderAccountModalView(preferredTab = "info") {
  const authView = document.getElementById("authView");
  const profileView = document.getElementById("profileView");
  const titleEl = document.getElementById("accountModalTitle");

  if (!authView || !profileView) return;

  if (!state.currentUser) {
    authView.classList.remove("hidden");
    profileView.classList.add("hidden");
    if (titleEl) {
      titleEl.innerHTML = `<i class="fa-regular fa-user"></i> Kirish / Ro‘yxatdan o‘tish`;
    }
    return;
  }

  authView.classList.add("hidden");
  profileView.classList.remove("hidden");
  if (titleEl) {
    titleEl.innerHTML = `<i class="fa-solid fa-user-check"></i> Shaxsiy Kabinet`;
  }

  const user = state.currentUser;
  const userOrders = state.orders.filter(
    (o) =>
      (user.email && o.userEmail === user.email) ||
      (user.phone && o.userPhone === user.phone) ||
      o.phone === user.phone
  );

  document.getElementById("profileName").textContent = user.name;
  document.getElementById("profilePhone").textContent = user.phone;
  document.getElementById("profileEmail").textContent = user.email;

  document.getElementById("detailName").textContent = user.name;
  document.getElementById("detailPhone").textContent = user.phone;
  document.getElementById("detailEmail").textContent = user.email;
  document.getElementById("detailOrdersCount").textContent = `${userOrders.length} ta`;

  // Render Orders History
  const ordersContainer = document.getElementById("userOrdersList");
  if (ordersContainer) {
    if (userOrders.length === 0) {
      ordersContainer.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-receipt"></i>
          <p>Sizda hali buyurtmalar tarixi mavjud emas.</p>
        </div>
      `;
    } else {
      ordersContainer.innerHTML = userOrders
        .map(
          (order) => `
          <div class="order-history-card">
            <div class="order-history-top">
              <strong>Buyurtma ${order.id}</strong>
              <span class="order-status-badge">${order.status}</span>
            </div>
            <div class="order-history-items">
              ${order.items.map((i) => `${i.name} (${i.qty}x)`).join(", ")}
            </div>
            <div class="order-history-bottom">
              <span>${order.createdAt}</span>
              <strong>${formatUZS(order.totalPrice)}</strong>
            </div>
          </div>
        `
        )
        .join("");
    }
  }

  switchProfileTab(preferredTab);
}

function switchProfileTab(tabName) {
  document.querySelectorAll(".profile-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.profileTab === tabName);
  });
  document
    .getElementById("profileInfoPanel")
    ?.classList.toggle("hidden", tabName !== "info");
  document
    .getElementById("profileOrdersPanel")
    ?.classList.toggle("hidden", tabName !== "orders");
}

function switchAuthTab(tabName) {
  document.querySelectorAll(".auth-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.authTab === tabName);
  });
  document
    .getElementById("loginForm")
    ?.classList.toggle("hidden", tabName !== "login");
  document
    .getElementById("registerForm")
    ?.classList.toggle("hidden", tabName !== "register");

  document.getElementById("loginError")?.classList.add("hidden");
  document.getElementById("registerError")?.classList.add("hidden");
}

function openAccountModal(preferredTab = "info") {
  renderAccountModalView(preferredTab);
  document.getElementById("accountModal")?.classList.remove("hidden");
  document.getElementById("accountBackdrop")?.classList.remove("hidden");
}

function closeAccountModal() {
  document.getElementById("accountModal")?.classList.add("hidden");
  document.getElementById("accountBackdrop")?.classList.add("hidden");
}

function initAccountEvents() {
  document
    .getElementById("openAccountBtn")
    ?.addEventListener("click", () => openAccountModal("info"));
  document
    .getElementById("closeAccountBtn")
    ?.addEventListener("click", closeAccountModal);
  document
    .getElementById("accountBackdrop")
    ?.addEventListener("click", closeAccountModal);

  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.authTab));
  });

  document.querySelectorAll(".profile-tab").forEach((tab) => {
    tab.addEventListener("click", () =>
      switchProfileTab(tab.dataset.profileTab)
    );
  });

  // Register Form
  const registerForm = document.getElementById("registerForm");
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const errEl = document.getElementById("registerError");

    const name = document.getElementById("regName")?.value.trim();
    const phone = document.getElementById("regPhone")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim().toLowerCase();
    const password = document.getElementById("regPassword")?.value;

    if (!name || !phone || !email || !password || password.length < 6) {
      if (errEl) {
        errEl.textContent = "Barcha maydonlarni to‘g‘ri kiriting (parol kamida 6 belgi).";
        errEl.classList.remove("hidden");
      }
      return;
    }

    const exists = state.users.some(
      (u) => u.email.toLowerCase() === email || u.phone === phone
    );
    if (exists) {
      if (errEl) {
        errEl.textContent = "Bu email yoki telefon raqam allaqachon ro‘yxatdan o‘tgan!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    const newUser = { id: Date.now().toString(), name, phone, email, password };
    state.users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, state.users);

    state.currentUser = newUser;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, state.currentUser);

    errEl?.classList.add("hidden");
    registerForm.reset();
    updateAccountHeaderUI();
    renderAccountModalView("info");
    showToast(`Xush kelibsiz, ${name}!`, "success");
  });

  // Login Form
  const loginForm = document.getElementById("loginForm");
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const errEl = document.getElementById("loginError");

    const identifier = document
      .getElementById("loginIdentifier")
      ?.value.trim()
      .toLowerCase();
    const password = document.getElementById("loginPassword")?.value;

    const foundUser = state.users.find(
      (u) =>
        (u.email.toLowerCase() === identifier || u.phone.toLowerCase() === identifier) &&
        u.password === password
    );

    if (!foundUser) {
      if (errEl) {
        errEl.textContent = "Telefon/email yoki parol noto‘g‘ri!";
        errEl.classList.remove("hidden");
      }
      return;
    }

    state.currentUser = foundUser;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, state.currentUser);

    errEl?.classList.add("hidden");
    loginForm.reset();
    updateAccountHeaderUI();
    renderAccountModalView("info");
    showToast(`Tizimga kirdingiz: ${foundUser.name}`, "success");
  });

  // Logout
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    state.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    updateAccountHeaderUI();
    switchAuthTab("login");
    renderAccountModalView("info");
    showToast("Akkountdan chiqildi", "info");
  });
}

// ==========================================================================
// CONTACT FORM, NAVIGATION & SCROLL EFFECTS
// ==========================================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("contactFeedback");
  if (!form || !feedback) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName")?.value.trim();
    const phone = document.getElementById("contactPhone")?.value.trim();
    const email = document.getElementById("contactEmail")?.value.trim();
    const message = document.getElementById("contactMessage")?.value.trim();

    if (!name || !phone || !message) return;

    const messages = loadFromStorage(STORAGE_KEYS.MESSAGES, []);
    messages.unshift({
      id: Date.now(),
      name,
      phone,
      email,
      message,
      date: new Date().toLocaleString("uz-UZ")
    });
    saveToStorage(STORAGE_KEYS.MESSAGES, messages);

    feedback.textContent = `Rahmat, ${name}! Xabaringiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.`;
    feedback.classList.remove("hidden");
    form.reset();
    showToast("Murojaatingiz yuborildi!", "success");
  });
}

function initNavigationAndScroll() {
  const header = document.querySelector(".header");
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");

  mobileToggle?.addEventListener("click", () => {
    nav?.classList.toggle("mobile-open");
    const icon = mobileToggle.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("mobile-open");
      const icon = mobileToggle?.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-xmark");
      }
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 24) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    // Active nav highlight
    const sections = ["home", "menu", "about", "contact"];
    let currentSection = "home";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top <= 160) currentSection = id;
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  });

  // Escape key closes open modals/drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeCheckoutModal();
      closeAccountModal();
    }
  });

  // Footer dynamic year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ==========================================================================
// APP INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderPopularProducts();
  renderMenuProducts();
  initMenuControls();
  updateCartUI();
  initCartEvents();
  initCheckoutEvents();
  updateAccountHeaderUI();
  initAccountEvents();
  initContactForm();
  initNavigationAndScroll();
});