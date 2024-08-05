import { EventEmitter } from './base/events';
import { Card } from './Card';

export class Page {
  private template: HTMLTemplateElement;
  private events: EventEmitter;
  private container: HTMLElement | null;

  constructor(template: HTMLTemplateElement, events: EventEmitter) {
    this.template = template;
    this.events = events;
    this.container = document.getElementById('gallery');
    if (!this.container) {
      console.error('Контейнер #gallery не найден в HTML.');
    }
  }

  render() {
    return this.container;
  }

  renderCards(cards: Card[]) {
    if (!this.container) return;

    this.container.innerHTML = '';
    cards.forEach(card => {
      this.container!.appendChild(card.render());
    });
  }
}