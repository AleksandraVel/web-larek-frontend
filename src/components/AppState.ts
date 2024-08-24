import { EventEmitter } from './base/events';
import { Product, BasketItem, IOrder, IContact } from '../types';
import { Model } from './base/Model';

export interface IAppState {
  products: Product[];
  basket: BasketItem[];
  orders: IOrder[];
}

export class AppState extends Model<IAppState> {
  products: Product[] = [];
  private contactData: IContact = { email: '', phone: '' };
  basket: BasketItem[] = [];
  orders: IOrder[] = [];

  constructor(events: EventEmitter) {
    super({ products: [], basket: [], orders: [] }, events);

    // Подписка на события
    this.on('set-products', this.setProducts);
    this.on('add-to-basket', this.addToBasket);
    this.on('basket:remove', this.removeFromBasket);
    this.on('basket:change', this.updateBasket);
    // ... другие события
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.emitChanges('get-products', { products });
  }

  getProducts() {
    return this.products;
  }

  addOrder(order: IOrder) {
    this.orders.push(order);
    this.emitChanges('order:added', { order });
  }

  getOrders() {
    return this.orders;
  }

  saveContactData(contactData: IContact) {
    this.contactData = contactData;
    this.emitChanges('contact:saved', { contactData });
  }

  getContactData() {
    return this.contactData;
  }

  addToBasket(product: Product) {
    // Проверяем, есть ли уже продукт в корзине
    const existingItem = this.basket.find(item => item.id === product.id);
    if (existingItem) {
      // Если продукт уже есть, увеличиваем его количество
      existingItem.quantity += 1;
    } else {
      // Если продукта нет в корзине, добавляем новый элемент
      const basketItem: BasketItem = {
        quantity: 1,
        id: product.id,
        product,
      };
      this.basket.push(basketItem);
    }
    // Отправляем событие об изменении корзины
    this.emitChanges('basket:add', product);
  }
  
  removeFromBasket(product: Product) {
    this.basket = this.basket.filter((item) => item.product.id !== product.id);
    this.emitChanges('basket:remove', product);
  }

  getBasketItems(): BasketItem[] {
    return this.basket;
  }

  updateBasket(basketItems: BasketItem[]) {
    this.basket = basketItems;
    this.emitChanges('basket:updated', { basket: this.basket });
  }
  
  private on<T extends object>(event: string, callback: (data: T) => void): void {
    this.events.on(event, callback);
  }

  private emit<T extends object>(event: string, data?: T): void {
    this.events.emit(event, data);
  }

  calculateTotalPrice(basketItems: BasketItem[]): number {
    return basketItems.reduce((total, item) => total + (item.product.price || 0), 0);
  }

  validateTotalPrice(basketItems: BasketItem[]): boolean {
    return basketItems.some(item => item.product.price !== null);
  }
}
