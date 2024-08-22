//Класс Form является компонентом, отвечающим за отображение и управление формой на странице.
import { IEvents } from './events';
import { Component } from './Component';

interface IFormState {
  valid: boolean;
  errors: string;
}

abstract class Form<T> extends Component<T & IFormState> {
  protected container: HTMLFormElement;
  protected events: IEvents;
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container);
    this.container = container;
    this.events = events;
    this._submit = this.container.querySelector('button[type="submit"]') as HTMLButtonElement;
    this._errors = this.container.querySelector('.form-errors') as HTMLElement;
  }

  protected onInputChange = (field: keyof T, value: string) => {
    this.events.emit(`form:${String(field)}:change`, { [field]: value });
  };

  set valid(value: boolean) {
    this._submit.disabled = !value;
}

set errors(value: string) {
    this.setText(this._errors, value);
}

  render(state: Partial<T & IFormState>): HTMLElement {
    const { valid, errors, ...inputs } = state;
    if (valid !== undefined) {
      this.valid = valid;
    }
    if (errors !== undefined) {
      this.errors = errors;
    }
    Object.assign(this, inputs);
    return this.container;
  }
}

export { Form, IFormState };