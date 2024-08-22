import { IEvents } from './base/events';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { Card } from './Card';

// Интерфейс для состояния страницы
interface IPage {
  counter: number;
  catalog: Card[];
  locked: boolean;
}

// Класс Page, наследующий от Component
export class Page extends Component<IPage> {
  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _wrapper: HTMLElement;
  protected _basket: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
      this.events.emit('bids:open');
    });
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  set catalog(items: Card[]) {
    this.renderCards(items.map(card => card.render()));
  }

  set locked(value: boolean) {
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }

  // Метод для отображения карточек товаров в галерее
  renderCards(cards: HTMLElement[]): void {
    this._catalog.replaceChildren(...cards);
  }

  // Метод для обработки клика по карточке товара
  handleCardClick(card: Card): void {
    this.events.emit('card:click', card.getProduct());
  }

  getHtml(): string {
    return this.container.outerHTML;
  }
}
