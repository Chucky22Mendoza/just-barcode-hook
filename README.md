<h1 align="center">⚡️ Just Barcode Hook ⚡️</h1>

> 📦 A React Hook for reading barcodes from devices that emulate a keyboard.

This package provides a simple and efficient React hook to detect barcodes entered quickly by a keyboard-emulating scanner. It allows you to register a callback function that automatically runs when a complete barcode is detected.

<p align="center">
  <a href="https://github.com/Chucky22Mendoza/just-barcode-hook" target="_blank">
    <img src="https://img.shields.io/github/stars/Chucky22Mendoza/just-barcode-hook?style=social" alt="GitHub stars" />
  </a>
  <a href="https://www.npmjs.com/package/just-barcode-hook" target="_blank">
    <img src="https://img.shields.io/npm/v/just-barcode-hook" alt="npm version" />
  </a>
  <a href="https://github.com/Chucky22Mendoza/just-barcode-hook/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/Chucky22Mendoza/just-barcode-hook" alt="license" />
  </a>
</p>

---

## 🚀 Installation

```bash
npm install just-barcode-hook
```

---

## 🧠 How It Works

Barcode scanners typically simulate rapid key presses ending with a key like **Enter**. This hook listens to `keydown` events, analyzes the timing between inputs, and detects when a barcode has finished scanning.

---

## 🧪 Basic Usage

```tsx
import React, { useEffect } from 'react';
import { useBarcodeScanner } from 'just-barcode-hook';

function App() {
  const scanner = useBarcodeScanner({
    latency: 50,
    minLength: 3,
    endKeys: ['Enter'],
  });

  useEffect(() => {
    scanner.on((code, event) => {
      console.log('Scanned barcode:', code);
    });

    return () => scanner.off();
  }, []);

  return <h1>Scan a barcode</h1>;
}

export default App;
```

---

## ⚙️ Available Options

Customize the hook behavior by passing an `Option` object:

| Property     | Type           | Description                                                                 | Default         |
|--------------|----------------|-----------------------------------------------------------------------------|-----------------|
| `latency`    | `number`       | Max time (ms) between key presses to be considered part of the same scan.   | `50`            |
| `minLength`  | `number`       | Minimum barcode length to be considered valid.                              | `3`             |
| `element`    | `HTMLElement`  | DOM element to attach the `keydown` listener to.                            | `document`      |
| `endKeys`    | `string[]`     | Keys indicating the end of a barcode.                                       | `['Enter']`     |
| `validKey`   | `RegExp`       | Regular expression to validate each character.                              | `/^\w$/`       |

---

## 🔄 Scanner Methods

The hook returns a `Scanner` object with the following methods:

- `on(handler: HandlerFunction)`: Starts listening and sets the function to run when a scan is complete.
- `off()`: Stops listening for events.

---

## 📦 Exported Types

```ts
interface Option {
  latency?: number;
  minLength?: number;
  element?: HTMLElement;
  endKeys?: string[];
  validKey?: RegExp;
}

type HandlerFunction = (code: string, event: KeyboardEvent) => void;

interface Scanner {
  on: (handler: HandlerFunction) => void;
  off: () => void;
}
```

---

## License

Distributed under the [MIT License](https://github.com/Chucky22Mendoza/just-barcode-hook/blob/main/LICENSE).

---

## Contribute

If you have suggestions or improvements for this project, feel free to open an *issue* or submit a *pull request* on the GitHub repository!

---

## Contact

- **Author**: [Jesús Mendoza Verduzco](https://jesus-mendoza.pages.dev/)
- **Email**: [loginlock22@gmail.com](mailto:loginlock22@gmail.com)
- **GitHub**: [@Chucky22Mendoza](https://github.com/Chucky22Mendoza)
