// ТИПЫ ДАННЫХ

//для продукта
export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

// Типы списка для данных получаемых с севера.
export interface ProductList {
  total: number; 
  items: Product[];
};

//для формы контактов
export interface IСontact {
  email: string;
  phone: string;
}

//для заказа
export interface IOrder {
  paymentMethod: PaymentMethod;
  address: Address;
}

//для формы оплаты
export interface PaymentMethod {
  type: 'online' | 'cash';
}

export interface Address {
  [key: string]: string | number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Тип для элемента корзины
export type BasketItem = {
  quantity: number;
  id: string;
  product: Product; 
};
