const STORAGE_KEY = 'logicode-cart';

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};

const addToCart = (product, selectedVariant = {}) => {
  const cart = getCart();
  const item = {
    id: `${product.id}-${selectedVariant.size || 'general'}-${selectedVariant.color || 'general'}`,
    productId: product.id,
    name: product.name,
    image: product.images[0],
    price: product.price,
    quantity: 1,
    size: selectedVariant.size || 'No aplica',
    color: selectedVariant.color || 'No aplica'
  };

  const existingItem = cart.find((entry) => entry.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  return cart;
};

const removeFromCart = (itemId) => {
  const updated = getCart().filter((item) => item.id !== itemId);
  saveCart(updated);
  return updated;
};

const updateQuantity = (itemId, delta) => {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === itemId);
  if (!item) return cart;

  item.quantity += delta;
  if (item.quantity <= 0) {
    return removeFromCart(itemId);
  }

  saveCart(cart);
  return cart;
};

const getCartTotal = (cart = getCart()) =>
  cart.reduce((total, item) => total + item.price * item.quantity, 0);

const clearCart = () => {
  localStorage.removeItem(STORAGE_KEY);
  return [];
};

const buildWhatsAppMessage = (cart, customerName = 'Cliente') => {
  const subtotal = getCartTotal(cart);
  const total = subtotal;

  const itemsText = cart
    .map(
      (item) =>
        `- ${item.name} | Talla: ${item.size} | Color: ${item.color} | Cantidad: ${item.quantity} | Precio: $${item.price.toLocaleString()} | Subtotal: $${(item.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  return `Hola, quiero realizar el siguiente pedido:\n${itemsText}\n\nTotal: $${total.toLocaleString()}\nMi nombre es: ${customerName}`;
};

const applyCouponDiscount = (couponCode, total) => {
  const normalized = couponCode.trim().toUpperCase();
  const discountRate = coupons[normalized] || 0;
  return {
    code: normalized,
    rate: discountRate,
    discount: total * discountRate,
    totalAfterDiscount: total - total * discountRate
  };
};

window.cartUtils = {
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  clearCart,
  buildWhatsAppMessage,
  applyCouponDiscount
};
