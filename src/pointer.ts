export interface Pointer {
  x: number;
  y: number;
  normalX: number;
  normalY: number;
}

export type PointerListener = (pointers: Pointer[]) => void;

export type PointerEventKey = 'start' | 'end' | 'move';

class PointerService {
  listeners: { [eventKey in PointerEventKey]: PointerListener[] } = {
    start: [],
    end: [],
    move: []
  };

  pointers: Pointer[] = [];
  isDown = false;

  on = (eventKey: PointerEventKey, listener: PointerListener): (() => void) => {
    if (!this.listeners[eventKey].length) {
      switch (eventKey) {
        case 'start': {
          window.addEventListener('mousedown', this.onPointerStart);
          window.addEventListener('touchstart', this.onPointerStart);
          break;
        }
        case 'end': {
          window.addEventListener('mouseup', this.onPointerStart);
          window.addEventListener('touchend', this.onPointerStart);
          break;
        }
        case 'move': {
          window.addEventListener('mousemove', this.onPointerMove);
          window.addEventListener('touchmove', this.onPointerMove);
          break;
        }
        default:
          break;
      }
    }
    if (!this.listeners[eventKey].includes(listener)) this.listeners[eventKey].push(listener);
    return () => this.off(eventKey, listener);
  };

  off = (eventKey: PointerEventKey, listener: PointerListener): void => {
    this.listeners[eventKey] = this.listeners[eventKey].filter((_listener) => _listener !== listener);
    if (!this.listeners[eventKey].length) {
      switch (eventKey) {
        case 'start': {
          window.removeEventListener('mousedown', this.onPointerStart);
          window.removeEventListener('touchstart', this.onPointerStart);
          break;
        }
        case 'end': {
          window.removeEventListener('mouseup', this.onPointerStart);
          window.removeEventListener('touchend', this.onPointerStart);
          break;
        }
        case 'move': {
          window.removeEventListener('mousemove', this.onPointerMove);
          window.removeEventListener('touchmove', this.onPointerMove);
          break;
        }
        default:
          break;
      }
    }
  };

  setPointers(event: MouseEvent | TouchEvent) {
    this.pointers = [];
    if (event instanceof MouseEvent) {
      this.pointers.push({
        x: event.clientX,
        y: event.clientY,
        normalX: event.clientX / window.innerWidth,
        normalY: event.clientY / window.innerHeight
      });
    } else {
      for (let i = 0; i < event.touches.length; i++) {
        const pointer = event.touches[i];
        this.pointers.push({
          x: pointer.clientX,
          y: pointer.clientY,
          normalX: pointer.clientX / window.innerWidth,
          normalY: pointer.clientY / window.innerHeight
        });
      }
    }
  }

  onPointerStart = (event: MouseEvent | TouchEvent) => {
    this.isDown = true;
    this.setPointers(event);
    this.listeners['start'].forEach((listener) => listener(this.pointers));
  };

  onPointerEnd = (event: MouseEvent | TouchEvent) => {
    this.isDown = false;
    this.setPointers(event);
    this.listeners['end'].forEach((listener) => listener(this.pointers));
  };

  onPointerMove = (event: MouseEvent | TouchEvent) => {
    this.setPointers(event);
    this.listeners['move'].forEach((listener) => listener(this.pointers));
  };
}

const pointer = new PointerService();

export default pointer;
