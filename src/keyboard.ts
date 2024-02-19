export type KeyboardListener = (event: KeyboardEvent) => void;

export enum KeyboardEventKey {
  Down = 'keydown',
  Up = 'keyup'
}

class KeyboardService {
  listeners: { [eventKey in KeyboardEventKey]: KeyboardListener[] } = {
    [KeyboardEventKey.Down]: [],
    [KeyboardEventKey.Up]: []
  };

  on = (eventKey: KeyboardEventKey, listener: KeyboardListener): (() => void) => {
    if (!this.listeners[eventKey].length) {
      switch (eventKey) {
        case KeyboardEventKey.Down:
          window.addEventListener('keydown', this.onKeyDown);
          break;
        case KeyboardEventKey.Up:
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
        case KeyboardEventKey.Down:
          window.removeEventListener('keydown', this.onKeyDown);
          break;
        case KeyboardEventKey.Up:
          window.removeEventListener('keyup', this.onKeyUp);
          break;
        default:
          break;
      }
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    this.listeners[KeyboardEventKey.Down].forEach((listener) => listener(event));
  };

  onKeyUp = (event: KeyboardEvent) => {
    this.listeners[KeyboardEventKey.Up].forEach((listener) => listener(event));
  };
}

const keyboard = new KeyboardService();

export default keyboard;
