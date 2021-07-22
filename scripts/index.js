import { cartModalOpen, cartModalClose } from "./modal.js";
import pageCategory from "./pageCategory.js";
import pageGoods from "./pageGoods.js";
import { getLocalStorage } from './localStorage.js';

let hash = location.hash.substring(1);

pageCategory(hash);
pageGoods(hash);

const headerCityButton = document.querySelector('.header__city-button');
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const declOfNum = (n, titles) => {
	return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
	0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

export const updateCountGoodsCart = () => {
  if (getLocalStorage().length) {
    subheaderCart.textContent = declOfNum(getLocalStorage().length, ['товар', 'товара', 'товаров']);
  } else {
    subheaderCart.textContent = 'Корзина';
  }
}

updateCountGoodsCart();

// updateLocation();

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

// const updateLocation = () => {
//   const storageLocation = localStorage.getItem('lamoda-location');
  
//   headerCityButton.textContent =
//     storageLocation && storageLocation !== 'null' ?
//       storageLocation :
//       'Ваш город?';
// }

headerCityButton.addEventListener('click', () => {
  const city = prompt('Укажите ваш город');
  if (city) {
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city)
  }
  return;
  // const city = prompt('Укажите Ваш город');
  // if (city !== null) {
  //   localStorage.setItem('lamoda-location', city)
  // }
  // // headerCityButton.textContent = city;
  // updateLocation();
});



subheaderCart.addEventListener('click', () => {
  cartModalOpen(cartOverlay)
});

cartOverlay.addEventListener('click', e => {
  const target = e.target;

  // if (target.classList.contains('cart__btn-close')) {
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose(cartOverlay);
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    cartModalClose(cartOverlay);
  }
});
