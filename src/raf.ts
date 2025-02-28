import { EventManager } from './abstracts';

export type RafListener = (time: number, delta: number) => void;

class RafManager extends EventManager<RafListener> {
  public time = 0;

  private _rafId!: number;

  protected listeners: RafListener[] = [];

  protected bind() {
    this.time = Date.now();
    this._rafId = requestAnimationFrame(this._onUpdate);
  }

  protected unbind() {
    cancelAnimationFrame(this._rafId);
    this._rafId = 0;
  }

  public update() {
    const time = Date.now();
    const delta = (time - this.time) / 1000;
    this.time = time;
    this.listeners.forEach((listener) => listener(time, delta));
  }

  private _onUpdate = () => {
    this.update();
    this._rafId = requestAnimationFrame(this._onUpdate);
  };
}

export default new RafManager();
