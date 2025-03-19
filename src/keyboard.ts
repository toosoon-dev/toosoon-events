import { EventsManager } from './index';

export type KeyboardEventKey = 'down' | 'up' | 'press';

export type KeyboardListener = (event: KeyboardEvent) => void;

/**
 * Utility class for creating keyboard events listeners
 *
 * @class KeyboardManager
 * @extends EventsManager
 */
class KeyboardManager extends EventsManager<KeyboardEventKey, KeyboardListener> {
  protected listeners: Record<KeyboardEventKey, KeyboardListener[]> = {
    down: [],
    up: [],
    press: []
  };

  protected bind(eventKey: KeyboardEventKey) {
    switch (eventKey) {
      case 'down':
        window.addEventListener('keydown', this._onKeyDown);
        break;
      case 'up':
        window.addEventListener('keyup', this._onKeyUp);
        break;
      case 'press':
        window.addEventListener('keypress', this._onKeyPress);
        break;
      default:
        break;
    }
  }

  protected unbind(eventKey: KeyboardEventKey) {
    switch (eventKey) {
      case 'down':
        window.removeEventListener('keydown', this._onKeyDown);
        break;
      case 'up':
        window.removeEventListener('keyup', this._onKeyUp);
        break;
      case 'press':
        window.removeEventListener('keypress', this._onKeyPress);
        break;
      default:
        break;
    }
  }

  private _onKeyDown = (event: KeyboardEvent) => {
    this.listeners['down'].forEach((listener) => listener(event));
  };

  private _onKeyUp = (event: KeyboardEvent) => {
    this.listeners['up'].forEach((listener) => listener(event));
  };

  private _onKeyPress = (event: KeyboardEvent) => {
    this.listeners['press'].forEach((listener) => listener(event));
  };
}

export default new KeyboardManager();
