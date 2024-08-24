//Класс Basket отвечает за отображение корзины в модальном окне.
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement, cloneTemplate } from '../utils/utils';
import { Product, BasketItem } from '../types';
import { Modal } from './Modal';

interface IBasketProps {
  items: BasketItem[];
  totalPrice: number;
  allowOrder: boolean;
}

export function calculateTotalPrice(basketItems: BasketItem[]): number {
  return basketItems.reduce((total, item) => total + (item.product.price || 0), 0);
}

export function validateTotalPrice(basketItems: BasketItem[]): boolean {
  return basketItems.some(item => item.product.price !== null);
}

export class Basket extends Component<IBasketProps> {
  protected _itemsContainer: HTMLElement;
  protected _totalPriceElement: HTMLElement;
  protected _orderButton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents, protected modal: Modal) {
    if (!template || !template.content) {
      throw new Error('Invalid template element');
    }
    super(template.content.cloneNode(true) as HTMLElement);

    this._itemsContainer = ensureElement<HTMLElement>('.basket__list', this.container);
    this._totalPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
    this._orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this._orderButton.addEventListener('click', () => {
      this.events.emit('order:start');
      this.modal.close();
    });

    // Добавляем обработчик клика на корзину
    this.container.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  addToBasket(product: Product) {
    // Проверяем, есть ли уже продукт в корзине
    const existingItem = this.getBasketItems().find(item => item.product.id === product.id);
    if (existingItem) {
      // Если продукт уже есть, увеличиваем его количество
      existingItem.quantity += 1;
    } else {
      // Если продукта нет в корзине, добавляем новый элемент
      const basketItem: BasketItem = {
        quantity: 1,
        id: product.id,
        product,
      };
      this.getBasketItems().push(basketItem);
    }
    // Отправляем событие об изменении корзины
    this.events.emit('basket:change', this.getBasketItems());
  }

  set items(basketItems: BasketItem[]) {
    this._itemsContainer.replaceChildren(
      ...basketItems.map((item) => {
        const basketItem = cloneTemplate<HTMLElement>('#card-basket');
        const titleElement = ensureElement<HTMLElement>('.card__title', basketItem);
        const priceElement = ensureElement<HTMLElement>('.card__price', basketItem);
        const deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', basketItem);

        this.setText(titleElement, item.product.title);
        this.setText(priceElement, `${item.product.price} синапсов`);

        deleteButton.addEventListener('click', () => {
          this.events.emit('basket:remove', item);
        });

        return basketItem;
      })
    );
  }

  set totalPrice(price: number) {
    this.setText(this._totalPriceElement, `${price} синапсов`);
  }

  set allowOrder(value: boolean) {
    this.setDisabled(this._orderButton, !value);
  }

  render(data: IBasketProps): HTMLElement {
    super.render(data);
    this.modal.render({
      content: this.container,
    });
    return this.container;
  }

  getBasketItems(): BasketItem[] {
    return this.getBasketItems();
  }
}
