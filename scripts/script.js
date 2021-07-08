const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1);

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

// updateLocation();

// blocking scroll

const disableScroll = () => {

  if (document.disableScroll) return;
  const widthScroll = window.innerWidth - document.body.offsetWidth;

  document.disableScroll = true;
  document.body.dbScrollY = window.scrollY;

  document.body.style.cssText = `
  position: fixed;
  top: ${-window.scrollY}px;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-right: ${widthScroll}px;
  `;
};

const enableScroll = () => {

  document.disableScroll = false;
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY,
  })
};

// modal window

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
  cartOverlay.classList.add('cart-overlay-open');
  disableScroll();
}
const cartModalClose = () => {
  cartOverlay.classList.remove('cart-overlay-open');
  enableScroll();
}

subheaderCart.addEventListener('click', cartModalOpen);

cartOverlay.addEventListener('click', e => {
  const target = e.target;

  // if (target.classList.contains('cart__btn-close')) {
  if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
    cartModalClose();
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    cartModalClose();
  }
});

// request data base

const getData = async (server) => {
  const data = await fetch(server);
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные не были получены, ошибка ${data.status} ${data.statusText}`)
  }
}

const getGoods = (cb, prop, value) => {
  getData('db.json')
  .then(data => {
      if (value) {
        cb(data.filter(item => item[prop] ===value ));
      } else {
        cb(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

// page of category

try {
  const goodsList = document.querySelector('.goods__list');

  if (!goodsList) {
    throw 'This is not a goods page!'
  }
  
  const goodsTitle = document.querySelector('.goods__title');

  const changeTitle = () => {
    goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent;
  }
  
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

  const renderGoodsList = data => {
    goodsList.textContent = '';

    // data.forEach(item => {
    //   const card = createCard(item);
    //   goodsList.append(card);
    // })

    const arr = data.map(createCard);
    goodsList.append(...arr);
  };

  window.addEventListener('hashchange', () => {
    hash = location.hash.substring(1);
    changeTitle();
    getGoods(renderGoodsList, 'category', hash);
  })

  changeTitle();
  getGoods(renderGoodsList, 'category', hash);

} catch (err) {
  console.log(err);
}

// page of goods

try {
  if (!document.querySelector('.card-good')) {
    throw 'This is not a card-good page';
  }

const cardGoodImage = document.querySelector('.card-good__image');
const cardGoodBrand = document.querySelector('.card-good__brand');
const cardGoodTitle = document.querySelector('.card-good__title');
const cardGoodPrice = document.querySelector('.card-good__price');
const cardGoodColor = document.querySelector('.card-good__color');
const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper');
const cardGoodColorList = document.querySelector('.card-good__color-list');
const cardGoodSizes = document.querySelector('.card-good__sizes');
const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
const cardGoodBuy = document.querySelector('.card-good__buy');

const generateList = array => array.reduce((markup, item, i) => markup +
  `<li class="card-good__select-item" data-id="${i}">${item}</li>`, '');

const renderCardGood = ([{ cost, color, brand, name, sizes, photo }]) => {
    cardGoodImage.src = `goods-image/${photo}`;
    cardGoodImage.alt = `${brand} ${name}`;
    cardGoodBrand.textContent = brand;
    cardGoodTitle.textContent = name;
    cardGoodPrice.textContent = `${cost} ₽`;
    if (color) {
      cardGoodColor.textContent = color[0];
      cardGoodColor.dataset.id = 0;
      cardGoodColorList.innerHTML = generateList(color);
      console.log(cardGoodColorList);
      console.log(generateList(color));
    } else {
      cardGoodColor.style.display = 'none';
    }
    if (sizes) {
      cardGoodSizes.textContent = sizes[0];
      cardGoodSizes.dataset.id = 0;
      cardGoodSizesList.innerHTML = generateList(sizes);
    } else {
      cardGoodSizes.style.display = 'none';
    }
  };

  cardGoodSelectWrapper.forEach(item => {
    item.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.card-good__select')) {
        target.classList.toggle('card-good__select__open')
      }

      if (target.closest('.card-good__select-item')) {
        const cardGoodsSelect = item.querySelector('.card-good__select');
        cardGoodsSelect.textContent = target.textContent;
        cardGoodsSelect.dataset.id = target.dataset.id;
        cardGoodsSelect.classList.remove('card-good__select__open');
      }
    });
  });

  getGoods(renderCardGood, 'id', hash);
  
} catch (err) {
  console.log(err);
}