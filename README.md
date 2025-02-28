# TOOSOON EVENTS

Project providing managers implemented as singleton class instances. They abstract and prevent the process of creating multiple event listeners for common browser events. These managers are particularly useful for managing events that are likely to be listened to by many components.

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
import PointerManager, { Pointer } from 'toosoon-events/pointer';

function onPointerStart(pointers: Pointers[]) {
  // ...
}

PointerManager.on('start', onPointerStart);

function dispose() {
  PointerManager.off('start', onPointerStart);
}
```

## Managers

`KeyboardManager`

`PointerManager`

`RafManager`

`ResizeManager`

`ScrollManager`

## License

MIT License, see [LICENSE](https://github.com/toosoon-dev/toosoon-events/tree/master/LICENSE) for details.
