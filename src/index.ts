import './scss/styles.scss';

import { API_URL } from './utils/constants';
import { Api } from './components/base/api';
//import { Component } from './components/Component';
import { EventEmitter } from './components/base/events';
//import { Model } from './components/Model';

//import { AppState} from './components/AppState';
//import { Basket } from './components/Basket';
//import { Card } from './components/Card';
//import { ContactForm } from './components/ContactForm';
//import import { Modal } from './components/Modal';
//{ Order } from './components/Order';
//import { Page } from './components/Page';
//import { SuccessModal } from './components/SuccessModal';

import { Product, ProductList} from './types';
import { cloneTemplate, ensureElement } from './utils/utils';

// шаблоны
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const events = new EventEmitter();
const api = new Api(API_URL);

// Модели данных приложения
//const appState = new AppState(events);

// Глобальные контейнеры
//const page = new Page(document.body, events);
//const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
//const basket = new Basket(cloneTemplate(basketTemplate), events);
//const order = new Order(cloneTemplate(orderTemplate), events);
//const contacts = new ContactForm(cloneTemplate(contactsTemplate), events);
//const successModal = new SuccessModal(cloneTemplate(successTemplate), events);

// Получаем товары с сервера
api.get('/product')
  .then((res: ProductList) => {
    appState.setProducts(res.items as Product[]);
  }).catch((err) => {
    console.error(err);
  });