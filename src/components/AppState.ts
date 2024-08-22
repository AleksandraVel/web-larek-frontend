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

  protected basket: BasketItem[];
  protected orders: IOrder[];

  constructor(events: EventEmitter) {
    super({ products: [], basket: [], orders: [] }, events);

    // Подписка на события
    this.on('set-products', this.setProducts);
    this.on('add-to-basket', this.addToBasket);
    //this.on('remove-from-basket', this.removeFromBasket);
    // ... другие события
  }

  // Подписка на события
  private on<T extends object>(event: string, callback: (data: T) => void): void {
    this.events.on(event, callback);
  }

  addToBasket(product: Product) {
    console.log('Product added to basket:', product);
  }

  removeFromBasket(product: Product) {
    this.emitChanges('remove-from-basket', product);
  }
  
  private emit<T extends object>(event: string, data?: T): void {
    this.events.emit(event, data); 
  }
}