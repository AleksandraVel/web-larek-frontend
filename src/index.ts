//import { ContactForm } from './components/ContactForm';
//import { Order } from './components/Order';
//import { SuccessModal } from './components/SuccessModal';
import { Basket, calculateTotalPrice, validateTotalPrice } from './components/Basket';
import './scss/styles.scss';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/AppState';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Product, ProductList, BasketItem } from './types';
import { API_URL } from './utils/constants';
import { CardPreview } from './components/CardPreview';
import { Modal } from './components/Modal';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');

// Создаем объекты EventEmitter, Api и AppState
const events = new EventEmitter();
const api = new Api(API_URL);
const appState = new AppState(events);

// Создаем модальное окно
const modalElement = ensureElement<HTMLElement>('#modal-container');
const modal = new Modal(modalElement, events);


// Создаем страницу и получаем ссылку на элемент галереи
const galleryElement = ensureElement<HTMLElement>('#gallery');
const basketElement = ensureElement<HTMLElement>('.header__basket');
const page = new Page(galleryElement, events );

// Получаем товары с сервера и отображаем каталог
api.get<ProductList>('/product')
  .then((res: ProductList) => {
    appState.setProducts(res.items as Product[]);
    const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
    if (!cardCatalogTemplate) {
      throw new Error('Card catalog template not found');
    }
    const cards = res.items.map((product) => new Card(cardCatalogTemplate, product, events));
    page.catalog = cards;
  })
  .catch((err) => {
    console.error(err);
  });

// открытие карточки по клику
  events.on('card:click', (product: Product) => {
    const cardPreview = new CardPreview(
      ensureElement<HTMLTemplateElement>('#card-preview'),
      product,
      events,
      modal
    );
    modal.render({
      content: cardPreview.render(),
    });
  });

  events.on('basket:add', (basketItem: BasketItem) => {
    appState.addToBasket(basketItem.product);
    events.emit('basket:change', appState.getBasketItems());
  });

//обработчик клика на корзину
basketElement.addEventListener('click', () => {
    events.emit('basket:open');
  });
  
  //oбновление количества товаров в корзине на странице:

events.on('basket:change', (basketItems: BasketItem[]) => {
  page.counter = basketItems.length;
  
  const basket = new Basket(cloneTemplate<HTMLTemplateElement>('#basket'), events, modal);
  basket.render({
    items: basketItems,
    totalPrice: calculateTotalPrice(basketItems),
    allowOrder: validateTotalPrice(basketItems),
  });
});

  const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
  if (!basketTemplate) {
    throw new Error('Basket template not found');
  }
  

  events.on('basket:open', () => {
    const basketItems = appState.getBasketItems();
    const basket = new Basket(basketTemplate, events, modal);
    modal.render({
      content: basket.render({
        items: basketItems,
        totalPrice: calculateTotalPrice(basketItems),
        allowOrder: validateTotalPrice(basketItems),
      }),
    });
  });

  
  events.on('basket:remove', (item: BasketItem) => {
    // Удаление элемента из корзины
    appState.removeFromBasket(item.product);
    events.emit('basket:change', appState.getBasketItems());
  });
