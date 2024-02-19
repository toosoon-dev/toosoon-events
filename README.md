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
import { resize } from 'toosoon-events';

function onResize(width: number, height: number) {
  // ...
}

const off = resize.on(onResize);

function dispose() {
  off();
}
```

```ts
import { resize } from 'toosoon-events';

function onResize(width: number, height: number) {
  // ...
}

resize.on(onResize);

function dispose() {
  resize.off(onResize);
}
```

## License

MIT License, see [LICENSE](https://github.com/toosoon-dev/toosoon-events/tree/master/LICENSE) for details
