export type ResizeListener = (event?: Event | UIEvent) => void;

let timeout: number;

class ResizeService {
  debounceTime = 10; // in ms
  listeners: ResizeListener[] = [];

  on = (listener: ResizeListener): (() => void) => {
    if (!this.listeners.length) {
      window.addEventListener('resize', this.onResize);
      window.addEventListener('orientationchange', this.onResize);
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
    return () => this.off(listener);
  };

  off = (listener: ResizeListener): void => {
    this.listeners = this.listeners.filter((_listener) => _listener !== listener);
    if (!this.listeners.length) {
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('orientationchange', this.onResize);
    }
  };

  onResize = (event: Event | UIEvent) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      this.listeners.forEach((listener) => listener(event));
      timeout = setTimeout(() => {
        this.listeners.forEach((listener) => listener(event));
      }, 500);
    }, this.debounceTime);
  };
}

const resize = new ResizeService();

export default resize;
