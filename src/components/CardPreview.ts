import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';
import { Product } from '../types';
import { Modal } from './Modal';
import { CDN_URL } from '../utils/constants';

export class CardPreview extends Component<Product> {
  protected product: Product;

  // Защищенные свойства для доступа к элементам шаблона
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _button: HTMLButtonElement;
  protected _category: HTMLSpanElement;
  protected _price: HTMLSpanElement;
  protected _description?: HTMLElement;

  // Свойство для хранения событий
  protected events: EventEmitter;

  // Ссылка на модальное окно
  protected modal: Modal;

  constructor(template: HTMLTemplateElement, product: Product, events: EventEmitter, modal: Modal) {
    super(template.content.cloneNode(true) as HTMLElement);
    this.product = product;
    this.events = events;
    this.modal = modal;

    // Получаем элементы шаблона из клонированного контента
    this._title = ensureElement<HTMLElement>('.card__title', this.container);
    this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
    this._button = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', this.container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', this.container);
    this._description = this.container.querySelector('.card__text');

    // Инициализируем элементы
    this.initElement();

    // Добавляем обработчик клика на кнопку "Добавить в корзину"
    this._button.addEventListener('click', () => {
      this.handleAddToBasket();
    });

    // Добавляем обработчик клика на карточку для открытия модального окна
    this.container.addEventListener('click', () => {
      this.handleClick();
    });
  }

  // Защищенный метод инициализации элемента
  protected initElement() {
    this._title.textContent = this.product.title;
    this._image.setAttribute('src', `${CDN_URL}/${this.product.image}`);
    this._price.textContent = `${this.product.price} синапсов`;
    this._category.textContent = this.product.category;
    if (this._description) {
      this._description.textContent = this.product.description;
    }
  }

  handleAddToBasket() {
    this.events.emit('basket:add', this.product);
  }

  handleClick() {
    this.modal.render({
      content: this.render(),
    });
  }

  render(): HTMLElement {
    const container = this.container.cloneNode(true) as HTMLElement;
    const title = ensureElement<HTMLElement>('.card__title', container);
    const image = ensureElement<HTMLImageElement>('.card__image', container);
    const price = ensureElement<HTMLSpanElement>('.card__price', container);
    const category = ensureElement<HTMLSpanElement>('.card__category', container);
    const description = container.querySelector('.card__text');
  
    title.textContent = this.product.title;
    image.setAttribute('src', `${CDN_URL}/${this.product.image}`);
    price.textContent = `${this.product.price} синапсов`;
    category.textContent = this.product.category;
    if (description) {
      description.textContent = this.product.description;
    }
  
    return container;
  }
}