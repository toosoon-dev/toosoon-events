import { EventManager } from './index';

export type ScrollListener = (event?: Event) => void;

class ScrollManager extends EventManager<ScrollListener> {
  protected listeners: ScrollListener[] = [];

  protected bind() {
    window.addEventListener('scroll', this._onScroll);
  }

  protected unbind() {
    window.removeEventListener('scroll', this._onScroll);
  }

  private _onScroll = (event: Event) => {
    this.listeners.forEach((listener) => listener(event));
  };
}

export default new ScrollManager();
