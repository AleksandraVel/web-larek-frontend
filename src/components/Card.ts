import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { Product } from '../types';

// Класс Card, представляющий карточку товара
export class Card extends Component<Product> {
  // Приватное свойство, хранящее данные о товаре
  private product: Product;

  // Защищенные свойства для доступа к элементам шаблона
  protected _index?: HTMLElement;
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
    super(template);
    this.product = product;
    this.events = events;

    // Получаем элементы шаблона из клонированного контента
    this._index = template.content.querySelector('.card__index');
    this._title = template.content.querySelector('.card__title')!;
    this._image = template.content.querySelector('.card__image')!;
    this._button = template.content.querySelector('.card__button')!;
    this._category = template.content.querySelector('.card__category')!;
    this._price = template.content.querySelector('.card__price')!;
    this._description = template.content.querySelector('.card__text');

    // Проверяем, что элементы были успешно найдены
    if (!this._title || !this._image || !this._button || !this._category || !this._price) {
      throw new Error('Required DOM elements are not found in card template');
    }

    // Вызываем метод инициализации элемента
    this.initElement();
  }

  // Защищенный метод инициализации элемента
  protected initElement() {
    this._title.textContent = this.product.title;
    this._image.setAttribute('src', this.product.image);
    this._price.textContent = `${this.product.price} синапсов`;
    this._category.textContent = this.product.category;
    if (this._description) {
      this._description.textContent = this.product.description;
    }

    // Добавляем обработчик клика на кнопку
    this._button.addEventListener('click', () => {
      this.events.emit('add-to-basket', this.product);
    });
    return this;
  }

  // Метод getHtml для получения HTML-контента карточки
  getHtml(): string {
    return this.render().outerHTML;
  }
}
