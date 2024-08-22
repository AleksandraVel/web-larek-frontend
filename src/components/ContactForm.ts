//Класс ContactForm отображает форму для ввода контактных данных пользователя (email и телефон)
import { Form, IFormState } from './base/Form';
import { IEvents } from './base/events';
import { AppState } from './AppState';
import { IContact } from '../types';

export class ContactForm extends Form<IContact> {
  private _emailInput: HTMLInputElement;
  private _phoneInput: HTMLInputElement;

  constructor(contactContainer: HTMLElement, events: IEvents, private appState: AppState) {
    super(contactContainer as HTMLFormElement, events);
    this._emailInput = this.container.querySelector('#email') as HTMLInputElement;
    this._phoneInput = this.container.querySelector('#phone') as HTMLInputElement;
  }

  set email(value: string) {
    this._emailInput.value = value;
  }

  set phone(value: string) {
    this._phoneInput.value = value;
  }

  render(state: Partial<IContact> & IFormState): HTMLElement {
    const { email, phone, ...formState } = state;
    super.render(formState);
    this.email = email || '';
    this.phone = phone || '';
    return this.container;
  }

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const formData: IContact = {
      email: this._emailInput.value,
      phone: this._phoneInput.value,
    };
    this.appState.saveContactData(formData);
    this.events.emit('contact:submit', formData);
  };
}
