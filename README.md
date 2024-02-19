# TOOSOON EVENTS

TOOSOON event services.

## Installation

Yarn:

```properties
$ yarn add toosoon-events
```

NPM:

```properties
$ npm install toosoon-events
```

## Usage

```ts
import { keyboard, pointer, raf, resize, pointer, scroll } from 'toosoon-events';
import type { KeyboardEventKey } from 'toosoon-events/keyboard';
import type { Pointer, PointerEventKey } from 'toosoon-events/pointer';

function onKeyDown(event: KeyboardEvent) {
  // ...
}

function onPointerStart(pointers: Pointers[]) {
  // ...
}

function onUpdate(time: number, delta: number) {
  // ...
}

function onResize(width: number, height: number) {
  // ...
}

function onScroll(event: Event) {
  // ...
}

keyboard.on(KeyboardEventKey.Down, onKeyDown);
pointer.on(PointerEventKey.Start, onPointerStart);
raf.on(onUpdate);
resize.on(onResize);
scroll.on(onScroll);

function dispose() {
  keyboard.off(KeyboardEventKey.Down, onKeyDown);
  pointer.off(PointerEventKey.Start, onPointerStart);
  raf.off(onUpdate);
  resize.off(onResize);
  scroll.off(onScroll);
}
```

## Services

`keyboard`

`pointer`

`raf`

`resize`

`scroll`

## License

MIT License, see [LICENSE](https://github.com/toosoon-dev/toosoon-events/tree/master/LICENSE) for details
