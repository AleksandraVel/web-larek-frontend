import { EventEmitter } from './base/events';
import { Product, BasketItem, IOrder } from '../types';
import { Model } from './base/Model';

interface IAppState {
  products: Product[];
  basket: BasketItem[];
  orders: IOrder[];
}

export class AppState extends Model<IAppState> {
  protected products: Product[]; 
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

  // Установка списка продуктов
  setProducts(products: Product[]) {
    this.products = products;
    this.emitChanges('get-products', this.products); 
  }

  addToBasket(product: Product) {
    console.log('Product added to basket:', product);
  }

  removeFromBasket(product: Product) {
    this.emitChanges('remove-from-basket', product);
  }
  
  // ... другие методы для работы с корзиной, заказами

  private emit<T extends object>(event: string, data?: T): void {
    this.events.emit(event, data); 
  }
}