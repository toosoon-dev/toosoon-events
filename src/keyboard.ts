export type KeyboardListener = (event: KeyboardEvent) => void;

export type KeyboardEventKey = 'down' | 'up';

class KeyboardService {
  listeners: { [eventKey in KeyboardEventKey]: KeyboardListener[] } = {
    down: [],
    up: []
  };

  on = (eventKey: KeyboardEventKey, listener: KeyboardListener): (() => void) => {
    if (!this.listeners[eventKey].length) {
      switch (eventKey) {
        case 'down':
          window.addEventListener('keydown', this.onKeyDown);
          break;
        case 'up':
          window.addEventListener('keyup', this.onKeyUp);
          break;
        default:
          break;
      }
    }
    if (!this.listeners[eventKey].includes(listener)) this.listeners[eventKey].push(listener);
    return () => this.off(eventKey, listener);
  };

  off = (eventKey: KeyboardEventKey, listener: KeyboardListener): void => {
    this.listeners[eventKey] = this.listeners[eventKey].filter((_listener) => _listener !== listener);
    if (!this.listeners[eventKey].length) {
      switch (eventKey) {
        case 'down':
          window.removeEventListener('keydown', this.onKeyDown);
          break;
        case 'up':
          window.removeEventListener('keyup', this.onKeyUp);
          break;
        default:
          break;
      }
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    this.listeners['down'].forEach((listener) => listener(event));
  };

  onKeyUp = (event: KeyboardEvent) => {
    this.listeners['up'].forEach((listener) => listener(event));
  };
}

const keyboard = new KeyboardService();

export default keyboard;
