import * as U from '../lib/main';

const o = { ...U };

Object.setPrototypeOf(o, null);
Object.freeze(o);

Object.defineProperty(globalThis, '__bf_interpreter', {
  value: o,
  enumerable: true,
});

const app = document.getElementById('app') as HTMLDivElement;

app.textContent = `Press F12 to open devtools console`;
