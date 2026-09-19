const categoryFilters = document.getElementById('categoryFilters');
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartPanel = document.getElementById('cartPanel');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotalValue = document.getElementById('subtotalValue');
const discountValue = document.getElementById('discountValue');
const totalValue = document.getElementById('totalValue');
const couponInput = document.getElementById('couponInput');
const applyCoupon = document.getElementById('applyCoupon');
const couponMessage = document.getElementById('couponMessage');
const resetFilters = document.getElementById('resetFilters');
const clearCartButton = document.getElementById('clearCart');
const checkoutWhatsAppButton = document.getElementById('checkoutWhatsApp');
const resultsInfo = document.getElementById('resultsInfo');
const productModal = document.getElementById('productModal');
const productModalContent = document.getElementById('productModalContent');

const state = {
  selectedCategory: 'Todos',
  searchTerm: '',
  currentCoupon: null,
  filters: {
    minPrice: 0,
    maxPrice: 300000,
    availability: 'Todos',
    size: 'Todos',
    color: 'Todos',
    offerOnly: false
  },
  sortBy: 'featured'
};

const catalogPrice = window.formatPrice || ((value) => `$${Number(value).toLocaleString('es-CO')}`);

const getAvailabilityClass = (availability) => {
  if (availability === 'Disponible') return 'available';
  if (availability === 'Pocas unidades') return 'low';
  return 'out';
};

const getFilteredProducts = () => {
  const term = state.searchTerm.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory = state.selectedCategory === 'Todos' || product.category === state.selectedCategory;
    const matchesSearch =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);

    const matchesMinPrice = product.price >= state.filters.minPrice;
    const matchesMaxPrice = product.price <= state.filters.maxPrice;
    const matchesAvailability =
      state.filters.availability === 'Todos' || product.availability === state.filters.availability;

    const matchesSize =
      state.filters.size === 'Todos' ||
      (Array.isArray(product.sizes) ? product.sizes.includes(state.filters.size) : false);

    const matchesColor =
      state.filters.color === 'Todos' ||
      (Array.isArray(product.colors) ? product.colors.includes(state.filters.color) : false);

    const matchesOffer = !state.filters.offerOnly || product.discount > 0;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesAvailability &&
      matchesSize &&
      matchesColor &&
      matchesOffer
    );
  });
};

const sortProducts = (list) => {
  const sorted = [...list];

  switch (state.sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    case 'bestseller':
      return sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    default:
      return sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
};

const renderCategoryFilters = () => {
  const categories = ['Todos', ...new Set(products.map((product) => product.category))];

  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button
          class="category-chip ${state.selectedCategory === category ? 'active' : ''}"
          data-category="${category}"
          type="button"
        >
          ${category}
        </button>
      `
    )
    .join('');

  categoryFilters.querySelectorAll('.category-chip').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedCategory = button.dataset.category;
      renderCatalog();
    });
  });
};

const renderCatalog = () => {
  const filtered = sortProducts(getFilteredProducts());

  if (!filtered.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No encontramos productos con esos filtros.</h3>
        <p>Prueba cambiar los criterios de búsqueda o limpiar el filtro actual.</p>
      </div>
    `;
    resultsInfo.textContent = 'No hay resultados';
    return;
  }

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}" />
            <div class="product-badges">
              ${product.discount ? '<span class="badge offer">-' + product.discount + '%</span>' : ''}
              ${product.bestSeller ? '<span class="badge best-seller">Más vendido</span>' : ''}
            </div>
          </div>
          <div class="product-body">
            <div class="product-topline">
              <span class="product-category">${product.category}</span>
              <span class="product-stock ${getAvailabilityClass(product.availability)}">${product.availability}</span>
            </div>
            <h3>${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price-line">
              <span class="product-price">${catalogPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="product-old-price">${catalogPrice(product.oldPrice)}</span>` : ''}
            </div>
            <div class="product-actions">
              <button class="btn btn-secondary open-product" data-product-id="${product.id}">Ver producto</button>
              <button class="btn btn-primary add-to-cart" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                Agregar
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  resultsInfo.textContent = `Mostrando ${filtered.length} producto${filtered.length > 1 ? 's' : ''}`;

  bindCatalogInteractions();
};

const bindCatalogInteractions = () => {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const product = products.find((item) => item.id === Number(button.dataset.productId));
      if (!product) return;

      if (product.stock === 0) {
        alert('Este producto está agotado y no se puede agregar al carrito.');
        return;
      }

      const defaultSize = product.sizes?.[0] || 'Único';
      const defaultColor = product.colors?.[0] || 'General';
      const cart = window.cartUtils.addToCart(product, { size: defaultSize, color: defaultColor });
      renderCart(cart);
      cartPanel.classList.add('open');
    });
  });

  document.querySelectorAll('.open-product').forEach((button) => {
    button.addEventListener('click', () => {
      const product = products.find((item) => item.id === Number(button.dataset.productId));
      openProductModal(product);
    });
  });
};

const renderCart = (cart = window.cartUtils.getCart()) => {
  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-state">Tu carrito está vacío.</div>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" />
            <div>
              <h4>${item.name}</h4>
              <p class="cart-meta">Talla: ${item.size} • Color: ${item.color}</p>
              <div class="cart-item-price">${catalogPrice(item.price)}</div>
              <div class="qty-controls">
                <button type="button" data-action="decrease" data-item-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-action="increase" data-item-id="${item.id}">+</button>
              </div>
            </div>
            <button type="button" class="icon-button" data-remove-id="${item.id}" aria-label="Eliminar producto">×</button>
          </div>
        `
      )
      .join('');
  }

  const total = window.cartUtils.getCartTotal(cart);
  const discount = state.currentCoupon ? state.currentCoupon.discount : 0;
  const finalTotal = Math.max(total - discount, 0);

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  subtotalValue.textContent = catalogPrice(total);
  discountValue.textContent = `-${catalogPrice(discount)}`;
  totalValue.textContent = catalogPrice(finalTotal);

  cartItems.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const delta = button.dataset.action === 'increase' ? 1 : -1;
      const updatedCart = window.cartUtils.updateQuantity(itemId, delta);
      renderCart(updatedCart);
    });
  });

  cartItems.querySelectorAll('[data-remove-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const updatedCart = window.cartUtils.removeFromCart(button.dataset.removeId);
      renderCart(updatedCart);
    });
  });
};

const openProductModal = (product) => {
  if (!product) return;

  const selectedSize = product.sizes?.[0] || 'Único';
  const selectedColor = product.colors?.[0] || 'General';

  productModalContent.innerHTML = `
    <div class="modal-content">
      <div class="modal-gallery">
        <div class="modal-gallery-main">
          <img src="${product.images[0]}" alt="${product.name}" data-main-image />
        </div>
        <div class="modal-gallery-thumbs">
          ${product.images
            .map(
              (image, index) => `
              <img src="${image}" alt="${product.name} vista ${index + 1}" class="${index === 0 ? 'active' : ''}" data-thumb="${image}" />
            `
            )
            .join('')}
        </div>
      </div>

      <div class="modal-info">
        <span class="category">${product.category}</span>
        <h3 id="modalTitle">${product.name}</h3>
        <div class="modal-price-line">
          <span class="price">${catalogPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${catalogPrice(product.oldPrice)}</span>` : ''}
        </div>
        <p>${product.description}</p>

        <div class="variant-block">
          <span class="variant-title">Talla</span>
          <div class="variant-list">
            ${product.sizes
              .map(
                (size) => `
                  <button type="button" class="variant-option ${size === selectedSize ? 'active' : ''}" data-size="${size}">${size}</button>
                `
              )
              .join('')}
          </div>
        </div>

        <div class="variant-block">
          <span class="variant-title">Color</span>
          <div class="variant-list">
            ${product.colors
              .map(
                (color) => `
                  <button type="button" class="variant-option ${color === selectedColor ? 'active' : ''}" data-color="${color}">${color}</button>
                `
              )
              .join('')}
          </div>
        </div>

        <div class="modal-meta">
          <div><span>Disponibilidad</span><strong>${product.availability}</strong></div>
          <div><span>Stock</span><strong>${product.stock}</strong></div>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn btn-primary add-to-cart-from-modal" data-product-id="${product.id}">Agregar al carrito</button>
          <button type="button" class="btn btn-secondary" data-close="modal">Cerrar</button>
        </div>
      </div>
    </div>
  `;

  productModal.classList.remove('hidden');
  productModal.setAttribute('aria-hidden', 'false');

  productModal.querySelectorAll('[data-thumb]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const mainImage = productModal.querySelector('[data-main-image]');
      mainImage.src = thumb.dataset.thumb;
      productModal.querySelectorAll('[data-thumb]').forEach((item) => item.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  productModal.querySelectorAll('[data-size]').forEach((button) => {
    button.addEventListener('click', () => {
      productModal.querySelectorAll('[data-size]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });

  productModal.querySelectorAll('[data-color]').forEach((button) => {
    button.addEventListener('click', () => {
      productModal.querySelectorAll('[data-color]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
    });
  });

  productModal.querySelector('.add-to-cart-from-modal')?.addEventListener('click', () => {
    const activeSize = productModal.querySelector('[data-size].active')?.dataset.size || product.sizes?.[0] || 'Único';
    const activeColor = productModal.querySelector('[data-color].active')?.dataset.color || product.colors?.[0] || 'General';
    const cart = window.cartUtils.addToCart(product, { size: activeSize, color: activeColor });
    renderCart(cart);
    closeModal();
    cartPanel.classList.add('open');
  });

  productModal.querySelectorAll('[data-close="modal"]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });
};

const closeModal = () => {
  productModal.classList.add('hidden');
  productModal.setAttribute('aria-hidden', 'true');
};

const applyDiscountCoupon = () => {
  const cart = window.cartUtils.getCart();
  if (!cart.length) {
    couponMessage.textContent = 'Agrega productos antes de aplicar un cupón.';
    couponMessage.style.color = '#cc3657';
    return;
  }

  const couponCode = couponInput.value.trim();
  const subtotal = window.cartUtils.getCartTotal(cart);
  const discounted = window.cartUtils.applyCouponDiscount(couponCode, subtotal);

  if (!discounted.rate) {
    state.currentCoupon = null;
    couponMessage.textContent = 'Cupón no válido. Prueba LOGICODE10 o WELCOME15.';
    couponMessage.style.color = '#cc3657';
    renderCart(cart);
    return;
  }

  state.currentCoupon = discounted;
  couponMessage.textContent = `Cupón aplicado: ${discounted.code} (-${(discounted.rate * 100).toFixed(0)}%)`;
  couponMessage.style.color = '#1a8a53';

  const total = Math.max(subtotal - discounted.discount, 0);
  subtotalValue.textContent = catalogPrice(subtotal);
  discountValue.textContent = `-${catalogPrice(discounted.discount)}`;
  totalValue.textContent = catalogPrice(total);
};

const wireEvents = () => {
  searchInput.addEventListener('input', (event) => {
    state.searchTerm = event.target.value;
    renderCatalog();
  });

  document.getElementById('priceMin').addEventListener('input', (event) => {
    state.filters.minPrice = Number(event.target.value || 0);
    renderCatalog();
  });

  document.getElementById('priceMax').addEventListener('input', (event) => {
    state.filters.maxPrice = Number(event.target.value || 300000);
    renderCatalog();
  });

  document.getElementById('availabilityFilter').addEventListener('change', (event) => {
    state.filters.availability = event.target.value;
    renderCatalog();
  });

  document.getElementById('sizeFilter').addEventListener('change', (event) => {
    state.filters.size = event.target.value;
    renderCatalog();
  });

  document.getElementById('colorFilter').addEventListener('change', (event) => {
    state.filters.color = event.target.value;
    renderCatalog();
  });

  document.getElementById('offerOnly').addEventListener('change', (event) => {
    state.filters.offerOnly = event.target.checked;
    renderCatalog();
  });

  document.getElementById('sortProducts').addEventListener('change', (event) => {
    state.sortBy = event.target.value;
    renderCatalog();
  });

  resetFilters.addEventListener('click', () => {
    state.selectedCategory = 'Todos';
    state.searchTerm = '';
    state.filters = {
      minPrice: 0,
      maxPrice: 300000,
      availability: 'Todos',
      size: 'Todos',
      color: 'Todos',
      offerOnly: false
    };
    state.sortBy = 'featured';
    searchInput.value = '';
    document.getElementById('priceMin').value = 0;
    document.getElementById('priceMax').value = 300000;
    document.getElementById('availabilityFilter').value = 'Todos';
    document.getElementById('sizeFilter').value = 'Todos';
    document.getElementById('colorFilter').value = 'Todos';
    document.getElementById('offerOnly').checked = false;
    document.getElementById('sortProducts').value = 'featured';
    renderCategoryFilters();
    renderCatalog();
  });

  cartToggle.addEventListener('click', () => {
    cartPanel.classList.toggle('open');
  });

  closeCart.addEventListener('click', () => cartPanel.classList.remove('open'));

  applyCoupon.addEventListener('click', applyDiscountCoupon);

  clearCartButton.addEventListener('click', () => {
    const empty = window.cartUtils.clearCart();
    renderCart(empty);
  });

  checkoutWhatsAppButton.addEventListener('click', () => {
    const cart = window.cartUtils.getCart();
    if (!cart.length) {
      alert('Tu carrito está vacío. Añade productos antes de continuar.');
      return;
    }

    const customerName = prompt('Escribe tu nombre para incluirlo en el pedido:', 'Cliente');
    const message = encodeURIComponent(window.cartUtils.buildWhatsAppMessage(cart, customerName || 'Cliente'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  });

  productModal.addEventListener('click', (event) => {
    if (event.target === productModal || event.target.dataset.close === 'modal') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
};

if (categoryFilters && productGrid && searchInput) {
  renderCategoryFilters();
  renderCatalog();
  renderCart();
  wireEvents();
}

window.renderCatalog = renderCatalog;
window.renderCart = renderCart;
window.openProductModal = openProductModal;
