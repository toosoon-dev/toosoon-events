# TOOSOON EVENTS

Project providing services implemented as singleton class instances. They abstract and prevent the process of creating multiple event listeners for common browser events. These services are particularly useful for managing events that are likely to be listened to by many components.

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
import pointer, { Pointer, PointerEventKey } from 'toosoon-events/pointer';

function onPointerStart(pointers: Pointers[]) {
  // ...
}

pointer.on(PointerEventKey.Start, onPointerStart);

function dispose() {
  pointer.off(PointerEventKey.Start, onPointerStart);
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
