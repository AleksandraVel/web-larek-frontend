import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

interface IModalProps {
  content: HTMLElement;
}

export class Modal extends Component<IModalProps> {
  protected _closeButton: HTMLButtonElement;
  protected _modalContent: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this._modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', this.close.bind(this));
    this._modalContent.addEventListener('click', (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._modalContent.replaceChildren(value);
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close');
  }

  render(data: IModalProps): HTMLElement {
    super.render(data);
    this.open();
    return this.container;
  }
}