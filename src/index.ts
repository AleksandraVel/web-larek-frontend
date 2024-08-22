//import { Basket } from './components/Basket';
//import { ContactForm } from './components/ContactForm';
//import { Order } from './components/Order';
//import { SuccessModal } from './components/SuccessModal';
import './scss/styles.scss';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/AppState';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Product, ProductList } from './types';
import { API_URL } from './utils/constants';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

// Создаем объекты EventEmitter, Api и AppState
const events = new EventEmitter();
const api = new Api(API_URL);
const appState = new AppState(events);

// Создаем страницу и получаем ссылку на элемент галереи
const galleryElement = ensureElement<HTMLElement>('#gallery');
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