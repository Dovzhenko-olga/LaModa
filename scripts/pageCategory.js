// page of category
import getGoods from "./service.js";

const createCard = ({ id, preview, cost, brand, name, sizes }) => {
    
    // const navigationList = document.querySelector('.navigation__list');

    // navigationList.addEventListener('click', onNavigationClick);

    // function onNavigationClick(e) {

    //   if (e.target.nodeName === 'A') {
    //     goodsTitle.textContent = e.target.textContent;
    //   }
    // }

    // switch (hash) {
    //   case 'women':
    //     goodsTitle.textContent = 'Женщинам';
    //     break;
    //   case 'men':
    //     goodsTitle.textContent = 'Мужчинам';
    //     break;
    //   case 'kids':
    //     goodsTitle.textContent = 'Детям';
    //     break;
    //   default:
    //     goodsTitle.textContent = '';
    // }
    

  const li = document.createElement('li');
  li.classList.add('goods__item');

  li.innerHTML = `
    <article class="good">
      <a class="good__link-img" href="card-good.html#${id}">
          <img class="good__img" src="goods-image/${preview}" alt="">
      </a>
      <div class="good__description">
          <p class="good__price">${cost} &#8381;</p>
          <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
          ${sizes ?
      `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
      ''}
          <a class="good__link" href="card-good.html#${id}">Подробнее</a>
      </div>
    </article>
    `;

    return li;

};

export default (hash) => {
  
try {
const goodsTitle = document.querySelector('.goods__title');
const goodsList = document.querySelector('.goods__list');

  const changeTitle = () => {
  goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
}
  
  if (!goodsList) {
    throw 'This is not a goods page!'
  }
  
const renderGoodsList = data => {
    goodsList.textContent = '';

    // data.forEach(item => {
    //   const card = createCard(item);
    //   goodsList.append(card);
    // })

  const arr = data.map(createCard);
  goodsList.append(...arr);
};

  
  changeTitle();
  getGoods(renderGoodsList, 'category', hash);
  
  window.addEventListener('hashchange', () => {
    hash = location.hash.substring(1);
    changeTitle();
    getGoods(renderGoodsList, 'category', hash);
  })

} catch (err) {
  console.log(err);
}
}
