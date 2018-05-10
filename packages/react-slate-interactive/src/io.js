let counter = 0;
let hook;

export function ioHook() {
  return hook;
}

export function startIoCapture() {
  if (counter === 0) {
    // Importing `iohook` starts native module, so the side effects from
    // it are delayed until actually needed.
    hook = require('iohook'); // eslint-disable-line global-require
    hook.start();
  }
  counter++;
}

export function stopIoCapture() {
  counter--;
  if (counter === 0 && hook) {
    hook.unload();
  }
}
