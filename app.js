const products = [
  { id: 1, name: 'Solace Lounge Chair', type: 'Oak / natural linen', price: 740, tag: 'New', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85' },
  { id: 2, name: 'Arc Table Lamp', type: 'Brushed steel', price: 185, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85' },
  { id: 3, name: 'Onda Vase No. 03', type: 'Hand-thrown stoneware', price: 98, tag: 'Limited', image: 'https://images.unsplash.com/photo-1612196808214-b7e1d2b7af3b?auto=format&fit=crop&w=800&q=85' },
  { id: 4, name: 'Haven Throw', type: 'Wool / oat', price: 165, image: 'https://images.unsplash.com/photo-1583845112203-454c59a5d7d3?auto=format&fit=crop&w=800&q=85' }
];

const grid = document.querySelector('#productGrid');
const cart = [];
const money = amount => `$${amount.toLocaleString()}`;

grid.innerHTML = products.map(product => `
  <article class="product-card">
    <div class="product-image"><img src="${product.image}" alt="${product.name}" />${product.tag ? `<span class="tag">${product.tag}</span>` : ''}<button class="add-button" data-id="${product.id}" aria-label="Add ${product.name} to cart">+</button></div>
    <div class="product-info"><div><h3 class="product-name">${product.name}</h3><p class="product-type">${product.type}</p></div><p class="product-price">${money(product.price)}</p></div>
  </article>`).join('');

const panel = document.querySelector('#cartPanel');
const overlay = document.querySelector('#overlay');
const openCart = () => { panel.classList.add('open'); overlay.classList.add('visible'); panel.setAttribute('aria-hidden', 'false'); };
const closeCart = () => { panel.classList.remove('open'); overlay.classList.remove('visible'); panel.setAttribute('aria-hidden', 'true'); };
document.querySelector('#cartButton').addEventListener('click', openCart);
document.querySelector('#closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

function renderCart() {
  const count = cart.length;
  document.querySelector('#cartCount').textContent = count;
  document.querySelector('#cartTitleCount').textContent = `(${count})`;
  const items = document.querySelector('#cartItems');
  items.innerHTML = count ? cart.map((item, index) => `<div class="cart-item"><img src="${item.image}" alt="${item.name}"/><div><h3>${item.name}</h3><p>${item.type}</p><p>${money(item.price)}</p></div><button class="remove" data-index="${index}">Remove</button></div>`).join('') : '<p class="empty-cart">Your bag is waiting for something lovely.</p>';
  document.querySelector('#cartTotal').textContent = money(cart.reduce((total, item) => total + item.price, 0));
  document.querySelectorAll('.remove').forEach(button => button.addEventListener('click', () => { cart.splice(button.dataset.index, 1); renderCart(); }));
}

function notify(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200); }
grid.addEventListener('click', event => { const button = event.target.closest('.add-button'); if (!button) return; const product = products.find(item => item.id === Number(button.dataset.id)); cart.push(product); renderCart(); notify(`${product.name} added to your bag`); });
document.querySelector('#checkoutButton').addEventListener('click', () => notify(cart.length ? 'Checkout is ready for your next step.' : 'Your bag is still empty.'));
document.querySelector('#searchButton').addEventListener('click', () => notify('Search is coming soon.')); 
document.querySelector('#filterButton').addEventListener('click', () => notify('All pieces are currently on display.'));
document.querySelector('#newsletterForm').addEventListener('submit', event => { event.preventDefault(); document.querySelector('#formMessage').textContent = 'You’re on the list — welcome to Orbit.'; event.target.reset(); });
