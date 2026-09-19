const adminTableBody = document.getElementById('adminTableBody');
const totalProducts = document.getElementById('totalProducts');
const availableProducts = document.getElementById('availableProducts');
const outOfStockProducts = document.getElementById('outOfStockProducts');

const renderAdminStats = () => {
  const productCount = products.length;
  const available = products.filter((product) => product.stock > 0).length;
  const out = products.filter((product) => product.stock === 0).length;

  totalProducts.textContent = String(productCount);
  availableProducts.textContent = String(available);
  outOfStockProducts.textContent = String(out);
};

const renderAdminTable = () => {
  adminTableBody.innerHTML = products
    .map((product) => {
      let badgeClass = 'available';
      if (product.stock === 0) badgeClass = 'out';
      else if (product.stock <= 5) badgeClass = 'low';

      return `
        <tr>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${formatPrice(product.price)}</td>
          <td>${product.stock}</td>
          <td><span class="status-badge ${badgeClass}">${product.availability}</span></td>
        </tr>
      `;
    })
    .join('');
};

renderAdminStats();
renderAdminTable();
