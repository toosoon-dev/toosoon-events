export type RafListener = (time: number, delta: number) => void;

class RafService {
  listeners: RafListener[] = [];
  time = 0;
  frameId = 0;

  on = (listener: RafListener): (() => void) => {
    if (!this.frameId) {
      this.time = Date.now();
      this.frameId = requestAnimationFrame(this.update);
    }
    if (!this.listeners.includes(listener)) this.listeners.push(listener);
    return () => this.off(listener);
  };

  off = (listener: RafListener): void => {
    this.listeners = this.listeners.filter((_listener) => _listener !== listener);
    if (!this.listeners.length) {
      cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }
  };

  update = () => {
    const time = Date.now();
    const delta = (time - this.time) / 1000;
    this.time = time;

    this.listeners.forEach((listener) => listener(time, delta));
    this.frameId = requestAnimationFrame(this.update);
  };
}

const raf = new RafService();

export default raf;
