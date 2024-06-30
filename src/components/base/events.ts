type EventName = string | RegExp;
type Subscriber = Function;

// Интерфейс для класса EventEmitter, определяющий методы подписки и публикации событий.
export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
}

// Класс EventEmitter, реализующий интерфейс IEvents.
export class EventEmitter implements IEvents {
  _events: Map<EventName, Set<Subscriber>>;

  constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
  }

  // Метод для подписки на событие.
  on<T extends object>(eventName: EventName, callback: (event: T) => void) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<Subscriber>());
    }
    this._events.get(eventName)?.add(callback);
  }

  // Метод для отписки от события.
  off(eventName: EventName, callback: Subscriber) {
    if (this._events.has(eventName)) {
      this._events.get(eventName).delete(callback);
      if (this._events.get(eventName)?.size === 0) {
        this._events.delete(eventName);
      }
    }
  }

  // Метод для публикации события.
  emit<T extends object>(eventName: string, data?: T) {
    this._events.forEach((subscribers, name) => {
      if (name === '*') subscribers.forEach(callback => callback({
        eventName,
        data
      }));
      if (name instanceof RegExp && name.test(eventName) || name === eventName) {
        subscribers.forEach(callback => callback(data));
      }
    });
  }
}