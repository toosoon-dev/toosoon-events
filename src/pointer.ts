import { EventsManager } from './abstracts';

export interface Pointer {
  x: number;
  y: number;
}

export type PointerEventKey = 'start' | 'end' | 'move';

export type PointerListener = (pointers: Pointer[]) => void;

class PointerManager extends EventsManager<PointerEventKey, PointerListener> {
  private pointers: Pointer[] = [];

  protected listeners: Record<PointerEventKey, PointerListener[]> = {
    start: [],
    end: [],
    move: []
  };

  protected bind(eventKey: PointerEventKey) {
    switch (eventKey) {
      case 'start': {
        window.addEventListener('mousedown', this._onPointerStart);
        window.addEventListener('touchstart', this._onPointerStart);
        break;
      }
      case 'end': {
        window.addEventListener('mouseup', this._onPointerEnd);
        window.addEventListener('touchend', this._onPointerEnd);
        break;
      }
      case 'move': {
        window.addEventListener('mousemove', this._onPointerMove);
        window.addEventListener('touchmove', this._onPointerMove);
        break;
      }
      default:
        break;
    }
  }

  protected unbind(eventKey: PointerEventKey) {
    switch (eventKey) {
      case 'start': {
        window.removeEventListener('mousedown', this._onPointerStart);
        window.removeEventListener('touchstart', this._onPointerStart);
        break;
      }
      case 'end': {
        window.removeEventListener('mouseup', this._onPointerEnd);
        window.removeEventListener('touchend', this._onPointerEnd);
        break;
      }
      case 'move': {
        window.removeEventListener('mousemove', this._onPointerMove);
        window.removeEventListener('touchmove', this._onPointerMove);
        break;
      }
      default:
        break;
    }
  }

  private _setPointers(event: MouseEvent | TouchEvent) {
    this.pointers = [];
    if (event instanceof MouseEvent) {
      this.pointers.push({ x: event.clientX, y: event.clientY });
    } else {
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        this.pointers.push({ x: touch.clientX, y: touch.clientY });
      }
    }
  }

  private _onPointerStart = (event: MouseEvent | TouchEvent) => {
    this._setPointers(event);
    this.listeners['start'].forEach((listener) => listener(this.pointers));
  };

  private _onPointerEnd = (event: MouseEvent | TouchEvent) => {
    this._setPointers(event);
    this.listeners['end'].forEach((listener) => listener(this.pointers));
  };

  private _onPointerMove = (event: MouseEvent | TouchEvent) => {
    this._setPointers(event);
    this.listeners['move'].forEach((listener) => listener(this.pointers));
  };
}

export default new PointerManager();
