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

export interface ProductList {
  total: number;
  items: Product[];
}

export interface ProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
  error: string;
}

//для заказа
export interface Order {
  id: string;
  total: number;
  error: string;
}

//для формы контактов
export interface Сontact {
  email: string;
  phone: number;
}

//для формы оплаты
export interface PaymentMethod {
  type: 'online' | 'cash';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}