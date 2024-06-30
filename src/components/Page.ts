import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

// Интерфейс описывающий страницу
interface IPage {
  counter: number; // Счётчик товаров в корзине
  store: HTMLElement[]; // Массив карточек с товарами
  locked: boolean; // Отключает прокрутку страницы
}

// Класс, описывающий главную страницу
export class Page extends Component<IPage> {

  protected _counter: HTMLElement;
  protected _store: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  // Конструктор принимает родительский элемент и обработчик событий
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._store = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');
    this._basket.addEventListener('click', () => {
      this.events.emit('basket:open');
    });
  }

  // Сеттер для счётчика товаров в корзине
  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  // Сеттер для карточек товаров на странице
  set store(items: HTMLElement[]) {
    this._store.replaceChildren(...items);
  }

  // Сеттер для блока прокрутки
  set locked(value: boolean) {
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}