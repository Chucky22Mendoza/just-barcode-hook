import { useMemo } from 'react';

export interface Option {
  /**
   * Max time duration (in ms) between consecutive inputs
   * @default 50
   */
  latency?: number;
  /**
   * Min length of a valid barcode
   * @default 3
   */
  minLength?: number;
  /**
   * The HTML element to attach the event listener to
   * @default document
   */
  element?: HTMLElement;
  /**
   * Array of keys indicating end of barcode
   * @default ["Enter"]
   * Refer {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values Key Values | MDN}
   */
  endKeys?: Array<string>;
  /**
   * Regular expression to check for a valid key in barcode
   * @default /^\w$/
   * Refer {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values Key Values | MDN}
   */
  validKey?: RegExp;
}

export interface HandlerFunction {
  /**
   * @param code Scanned barcode
   * @param event Keyboard event from the end key
   */
  (code: string, event: KeyboardEvent): void;
}

export interface Scanner {
  /**
   * Starts listening for barcode scans and add/replace the listener
   *
   * @param {Function} handler Function to call on completion of barcode scan
   */
  on: (handler: HandlerFunction) => void;

  /**
   * Stop listening for barcode scans and remove the listener
   */
  off: () => void;
}

/**
 * Simple JavaScript utility to listen for barcode scanners emulating keyboard
 */
export default function useBarcodeScanner(
  options?: Option,
): Scanner {
  let fun: HandlerFunction;
  const optionsScanner = useMemo<Option | null>(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return null;

    return Object.assign(
      {
        latency: 50,
        minLength: 3,
        element: document,
        endKeys: ['Enter'],
        validKey: /^\w$/,
      },
      options,
    );
  }, [options]);
  let prevTime: number = 0;
  let code: string = '';

  function EventHandler(e: KeyboardEvent): void {
    const { key, timeStamp } = e;
    const timeDiff = timeStamp - prevTime;
    prevTime = timeStamp;
    // Ignore shift key
    if (key === 'Shift') return;

    const isValid = optionsScanner?.validKey?.test(key);
    const isEndKey = optionsScanner?.endKeys?.includes(key);

    if (optionsScanner?.latency && timeDiff > optionsScanner.latency) {
      // Maybe a normal key press or start of barcode
      if (!isEndKey && isValid) {
        code = key;
        return;
      }
      code = '';
      return;
    }
    if (isValid) {
      // Still scanning
      code += key;
      return;
    }
    if (isEndKey) {
      // End of barcode
      if (
        optionsScanner?.minLength &&
        code.length >= optionsScanner.minLength
      ) {
        fun(code, e);
        return;
      }
    }
    // Invalid character, reset
    code = '';
    return;
  }

  return {
    on: function (handler: HandlerFunction) {
      optionsScanner?.element?.removeEventListener(
        'keydown',
        EventHandler,
        true,
      );
      fun = handler;
      code = '';
      optionsScanner?.element?.addEventListener('keydown', EventHandler, true);
    },

    off: function () {
      optionsScanner?.element?.removeEventListener(
        'keydown',
        EventHandler,
        true,
      );
    },
  };
}
