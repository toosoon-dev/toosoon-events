export type ScrollListener = (event?: Event) => void;

class ScrollService {
  listeners: ScrollListener[] = [];

  on = (listener: ScrollListener): (() => void) => {
    if (!this.listeners.length) {
      window.addEventListener('scroll', this.onScroll, { passive: false });
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
    return () => this.off(listener);
  };

  off = (listener: ScrollListener) => {
    this.listeners = this.listeners.filter((_listener) => _listener !== listener);
    if (!this.listeners.length) {
      window.removeEventListener('scroll', this.onScroll);
    }
  };

  onScroll = (event: Event) => {
    this.listeners.forEach((listener) => listener(event));
  };
}

const scroll = new ScrollService();

export default scroll;
