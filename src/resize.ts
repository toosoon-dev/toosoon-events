export type ResizeListener = (width: number, height: number) => void;

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

  onResize = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.listeners.forEach((listener) => listener(width, height));
    }, this.debounceTime);
  };
}

const resize = new ResizeService();

export default resize;
