import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

interface IModalData {
  content: HTMLElement;
}

// Класс Modal, расширяющий базовый компонент для управления модальным окном.
export class Modal extends Component<IModalData> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content = ensureElement<HTMLElement>('.modal__content', container);
    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  // Метод для открытия модального окна.
  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  // Метод для закрытия модального окна.
  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close');
  }

  // Метод для рендеринга модального окна с данными.
  render(data: IModalData): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}