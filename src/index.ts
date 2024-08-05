//import { Basket } from './components/Basket';
//import { ContactForm } from './components/ContactForm';
//import { Order } from './components/Order';
//import { SuccessModal } from './components/SuccessModal';

import './scss/styles.scss';

// Импортируем необходимые компоненты
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { AppState } from './components/AppState';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Product, ProductList } from './types';
import { API_URL, CDN_URL } from './utils/constants';

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); //для карточки из HTML

// Создаем объекты
const events = new EventEmitter(); //EventEmitter для работы с событиями
const api = new Api(API_URL); //Api для взаимодействия с сервером
const appState = new AppState(events); //AppState для управления данными приложения 

// Создание страницы
const page = new Page(cardCatalogTemplate, events);

// Добавление страницы на страницу
document.body.appendChild(page.render());

// Получаем товары с сервера
api.get('/product')
    .then((res: ProductList) => {
        appState.setProducts(res.items as Product[]);
    })
    .catch((err) => {
        console.error(err);
    });

// Подписываемся на событие "get-products"
events.on('get-products', (products: Product[]) => { 
    const cards = products.map((product) => new Card(cloneTemplate(cardCatalogTemplate), product, events));
});