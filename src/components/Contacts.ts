import { IEvents } from "./base/events";
import { Form } from "./common/Form";

export interface IContacts {
  phone: string;
  email: string;
}

//Класс, описывающий окно контактов
export class Contacts extends Form<IContacts> {
  // Конструктор принимает родительский элемент и обработчик событий
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }
}