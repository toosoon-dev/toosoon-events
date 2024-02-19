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

Bind and unbind service:

```ts
import { resize } from 'toosoon-events';

function onResize(width: number, height: number) {
  // ...
}

const off = resize.on(onResize);

function dispose() {
  // Every service has an `off` method so you can also just call: `resize.off(onResize);`
  off();
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
