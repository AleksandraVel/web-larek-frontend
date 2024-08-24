//Класс SuccessModal отвечает за отображение окна с сообщением об успешном оформлении заказа.
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement, cloneTemplate } from '../utils/utils';

interface ISuccessModalProps {
  price: number;
}

export class SuccessModal extends Component<ISuccessModalProps> {
  protected _closeButton: HTMLButtonElement;
  protected _priceElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this._priceElement = ensureElement<HTMLElement>('.order-success__description', this.container);

    this._closeButton.addEventListener('click', () => {
      this.events.emit('successModal:close');
    });
  }

  set price(value: number) {
    this.setText(this._priceElement, `Списано ${value} синапсов`);
  }

}
