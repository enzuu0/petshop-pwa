const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const cart = [];
const cartDrawer = document.querySelector('#cart-drawer');
const overlay = document.querySelector('#overlay');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const cartTotal = document.querySelector('#cart-total');
const checkout = document.querySelector('#checkout');
const toast = document.querySelector('#toast');
const bookingModal = document.querySelector('#booking-modal');
const installModal = document.querySelector('#install-modal');
let installPrompt = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;
  document.body.style.overflow = '';
}

function renderCart() {
  cartCount.textContent = String(cart.length);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = money.format(total);
  checkout.disabled = cart.length === 0;
  if (!cart.length) {
    cartItems.innerHTML = '<div class="empty-cart"><span>＋</span><h3>Sua sacola está vazia</h3><p>Escolha algo especial para o seu pet.</p></div>';
    return;
  }
  cartItems.innerHTML = cart.map((item, index) => `<div class="cart-item"><div><h3>${item.name}</h3><p>1 unidade</p><button class="remove-item" data-index="${index}" type="button">Remover</button></div><strong>${money.format(item.price)}</strong></div>`).join('');
}

document.querySelector('#open-cart').addEventListener('click', openCart);
document.querySelector('#close-cart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.querySelectorAll('.add-button').forEach((button) => button.addEventListener('click', () => {
  cart.push({ name: button.dataset.name, price: Number(button.dataset.price) });
  renderCart();
  button.textContent = 'Adicionado ✓';
  setTimeout(() => { button.textContent = 'Adicionar'; }, 1200);
  showToast(`${button.dataset.name} foi para a sacola`);
}));

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('.remove-item');
  if (!button) return;
  cart.splice(Number(button.dataset.index), 1);
  renderCart();
});

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.product-card').forEach((card) => {
    card.hidden = button.dataset.filter !== 'todos' && card.dataset.category !== button.dataset.filter;
  });
}));

document.querySelectorAll('.booking-trigger').forEach((button) => button.addEventListener('click', () => bookingModal.showModal()));
document.querySelectorAll('.modal-close').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelector('#booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  bookingModal.close();
  event.target.reset();
  showToast('Pedido enviado! Vamos confirmar o horário.');
});

checkout.addEventListener('click', () => {
  closeCart();
  showToast('Pedido preparado para atendimento no WhatsApp.');
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
});

document.querySelectorAll('.install-trigger').forEach((button) => button.addEventListener('click', async () => {
  if (installPrompt) {
    installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') showToast('Pata+ instalado com sucesso!');
    installPrompt = null;
  } else {
    installModal.showModal();
  }
}));

document.querySelector('#show-install-help').addEventListener('click', () => installModal.showModal());

window.addEventListener('appinstalled', () => showToast('Pata+ já está no seu dispositivo!'));
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
renderCart();
