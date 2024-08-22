import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { ensureElement, cloneTemplate } from '../utils/utils';
import { Product } from '../types';
import { CDN_URL } from '../utils/constants';

// Класс Card, представляющий карточку товара
export class Card extends Component<Product> {
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

  // Конструктор класса Card
  constructor(template: HTMLTemplateElement, product: Product, events: EventEmitter) {
    super(template.content.cloneNode(true) as HTMLElement);
    this.product = product;
    this.events = events;

    // Получаем элементы шаблона из клонированного контента
    this._title = ensureElement<HTMLElement>('.card__title', this.container);
    this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
    this._button = ensureElement<HTMLButtonElement>('.gallery__item', this.container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', this.container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', this.container);
    this._description = this.container.querySelector('.card__text');

    // Вызываем метод инициализации элемента
    this.initElement();
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

    // Добавляем обработчик клика на кнопку
    this._button.addEventListener('click', () => {
      this.handleClick();
    });
  }

  // Метод для отображения карточки товара
  render(): HTMLElement {
    return this.container;
  }

  // Метод для обработки клика по карточке товара
  protected handleClick(): void {
    this.events.emit('card:click', this.product);
  }

  getProduct(): Product {
    return this.product;
  }
  
  // Метод getHtml для получения HTML-контента карточки
  getHtml(): string {
    return this.render().outerHTML;
  }
}