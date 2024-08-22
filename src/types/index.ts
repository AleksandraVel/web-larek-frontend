// ТИПЫ ДАННЫХ

// для продукта
export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Типы списка для данных, получаемых с сервера.
export interface ProductList {
  total: number;
  items: Product[];
}

// для формы контактов
export interface IContact {
  email: string;
  phone: string;
}

// для заказа
export interface IOrder {
  paymentMethod: PaymentMethod;
  address: Address;
}

// для формы оплаты
export interface PaymentMethod {
  type: "online" | "cash";
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  [key: string]: string | number;
}

// Тип для элемента корзины
export type BasketItem = {
  quantity: number,
  id: string,
  product: Product,
};