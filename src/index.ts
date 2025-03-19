/**
 * Utility class for creating multiple event listeners
 *
 * @exports
 * @class EventManager
 * @abstract
 */
export abstract class EventManager<EventListener extends Function> {
  /**
   * Array of listeners bound to this manager event
   */
  protected abstract listeners: EventListener[];

  /**
   * Add a listener to this manager listeners
   */
  public on(listener: EventListener): () => void {
    if (!this.listeners.length) this.bind();
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
    return () => this.off(listener);
  }

  /**
   * Remove a listener from this manager listeners
   */
  public off(listener: EventListener): void {
    this.listeners = this.listeners.filter((_listener) => _listener !== listener);
    if (!this.listeners.length) this.unbind();
  }

  /**
   * Bind event listeners
   */
  protected abstract bind(): void;

  /**
   * Unbind event listeners
   */
  protected abstract unbind(): void;
}

/**
 * Utility class for creating multiple events listeners
 *
 * @exports
 * @class EventsManager
 * @abstract
 */
export abstract class EventsManager<EventKey extends string, EventListener extends Function> {
  /**
   * Arrays of listeners bound to this manager events
   */
  protected abstract listeners: Record<EventKey, EventListener[]>;

  /**
   * Add a listener to this manager listeners
   */
  public on(eventKey: EventKey, listener: EventListener): () => void {
    if (!this.listeners[eventKey].length) this.bind(eventKey);
    if (!this.listeners[eventKey].includes(listener)) this.listeners[eventKey].push(listener);
    return () => this.off(eventKey, listener);
  }

  /**
   * Remove a listener gtom this manager listeners
   */
  public off(eventKey: EventKey, listener: EventListener): void {
    this.listeners[eventKey] = this.listeners[eventKey].filter((_listener) => _listener !== listener);
    if (!this.listeners[eventKey].length) this.unbind(eventKey);
  }

  /**
   * Bind events listeners
   */
  protected abstract bind(eventKey: EventKey): void;

  /**
   * Unbind events listeners
   */
  protected abstract unbind(eventKey: EventKey): void;
}
