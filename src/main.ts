import * as U from '../lib/main';

const name = 'BFInterpreter';

const mod = { ...U };
const proto = Object.create(null) as object;

Object.defineProperty(proto, Symbol.toStringTag, {
  value: name,
});

Object.setPrototypeOf(mod, proto);
Object.freeze(mod);

Object.defineProperty(window, name, {
  value: mod,
  enumerable: true,
});

Object.defineProperty(window, 'getObjectTag', {
  value: (obj: unknown) => Object.prototype.toString.call(obj),
  enumerable: true,
});

const app = document.getElementById('app') as HTMLDivElement;

app.textContent = `Press F12 to open devtools console`;
