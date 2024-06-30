import { Product } from '../components/AppData';

export type CategoryType =
  | 'другое'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'хард-скил';

export type CategoryMapping = {
  [Key in CategoryType]: string;
};

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface ApiResponse {
  items: IProduct[];
}

// Интерфейс, описывающий поля товара в магазине
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: CategoryType;
  price: number | null;
  selected: boolean;
}

/*
  * Интерфейс описывающий внутренне состояние приложения
    Используется для хранения карточек, корзины, заказа пользователя, ошибок
    при вообще в формах
    Так же имеет методы для работы с карточками и корзиной
  * */
export interface IAppState {
  // Корзина с товарами
  basket: Product[];
  // Массив карточек товара
  store: Product[];
  // Информация о заказе при покупке товара
  order: IOrder;
  // Ошибки при заполнении форм
  formErrors: FormErrors;
  // Метод для добавления товара в корзину
  addToBasket(value: Product): void;
  // Метод для удаления товара из корзины
  deleteFromBasket(id: string): void;
  // Метод для полной очистки корзины
  clearBasket(): void;
  // Метод для получения количества товаров в корзине
  getBasketAmount(): number;
  // Метод для получения суммы цены всех товаров в корзине
  getTotalBasketPrice(): number;
  // Метод для добавления ID товаров в корзине в поле items для order
  setItems(): void;
  // Метод для заполнения полей email, phone, address, payment в order
  setOrderField(field: keyof IOrderForm, value: string): void;
  // Валидация форм для окошка "контакты"
  validateContacts(): boolean;
  // Валидация форм для окошка "заказ"
  validateOrder(): boolean;
  // Очистить order после покупки товаров
  refreshOrder(): boolean;
  // Метод для превращения данных, полученых с сервера в тип данных приложения
  setStore(items: IProduct[]): void;
  // Метод для обновления поля selected во всех товарах после совершения покупки
  resetSelected(): void;
}

// Интерфейс, описывающий поля заказа товара
export interface IOrder {
  items: string[];
  payment: string;
  total: number;
  address: string;
  email: string;
  phone: string;
}

export interface IOrderForm {
  payment: string;
  address: string;
  email: string;
  phone: string;
}