export abstract class EventManager<EventListener extends Function> {
  protected abstract listeners: EventListener[];

  public on(listener: EventListener): () => void {
    if (!this.listeners.length) this.bind();
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
    return () => this.off(listener);
  }

  public off(listener: EventListener): void {
    this.listeners = this.listeners.filter((_listener) => _listener !== listener);
    if (!this.listeners.length) this.unbind();
  }

  protected abstract bind(): void;

  protected abstract unbind(): void;
}

export abstract class EventsManager<EventKey extends string, EventListener extends Function> {
  protected abstract listeners: Record<EventKey, EventListener[]>;

  public on(eventKey: EventKey, listener: EventListener): () => void {
    if (!this.listeners[eventKey].length) this.bind(eventKey);
    if (!this.listeners[eventKey].includes(listener)) this.listeners[eventKey].push(listener);
    return () => this.off(eventKey, listener);
  }

  public off(eventKey: EventKey, listener: EventListener): void {
    this.listeners[eventKey] = this.listeners[eventKey].filter((_listener) => _listener !== listener);
    if (!this.listeners[eventKey].length) this.unbind(eventKey);
  }

  protected abstract bind(eventKey: EventKey): void;

  protected abstract unbind(eventKey: EventKey): void;
}
