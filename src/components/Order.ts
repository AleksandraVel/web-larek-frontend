//Класс Order за отображение форм оформления заказа в модальном окне.
import { Form } from './base/Form';
import { IEvents } from './base/events';
import { AppState } from './AppState';
import { IOrder } from '../types';

export class Order extends Form<IOrder> {
  constructor(orderContainer: HTMLElement, events: IEvents, private appState: AppState) {
    super(orderContainer as HTMLFormElement, events);
  }

  renderPaymentForm() {
    // Отображение формы выбора способа оплаты
  }

  renderDeliveryForm() {
    // Отображение формы ввода адреса доставки
  }

  handleSubmit(data: IOrder) {
    // Обработка отправки формы заказа
    this.appState.addOrder(data);
    this.events.emit('order:submitted', data);
  }
}