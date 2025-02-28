import { EventManager } from './abstracts';

export type ResizeListener = (width: number, height: number) => void;

class ResizeManager extends EventManager<ResizeListener> {
  public width: number = 0;
  public height: number = 0;

  private _debounceDelay: number = 10; // in ms
  private _timeout!: ReturnType<typeof setTimeout>;

  protected listeners: ResizeListener[] = [];

  protected bind() {
    window.addEventListener('resize', this._onResize);
    window.addEventListener('orientationchange', this._onResize);
  }

  protected unbind() {
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('orientationchange', this._onResize);
  }

  public resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.listeners.forEach((listener) => listener(this.width, this.height));
  }

  private _onResize = () => {
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => this.resize, this._debounceDelay);
  };

  get debounceDelay() {
    return this._debounceDelay;
  }

  set debounceDelay(delay: number) {
    this._debounceDelay = delay;
  }
}

export default new ResizeManager();
