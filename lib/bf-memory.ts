import { BFRuntimeError } from './error';

export class BFMemory {
  #memory: Uint8Array<ArrayBuffer>;
  #ptr: number;

  static readonly name = 'BFMemory';

  constructor(bufferLength: number) {
    this.#memory = new Uint8Array(bufferLength);
    this.#ptr = 0;
  }

  get current() {
    const v = this.#memory.at(this.#ptr);
    if (v === undefined) {
      throw new BFRuntimeError('referenced memory is out of range', this.#ptr);
    }
    return v;
  }

  set current(n) {
    if (this.#memory[this.#ptr] === undefined) {
      throw new BFRuntimeError('referenced memory is out of range', this.#ptr);
    }
    this.#memory[this.#ptr] = n;
  }

  reAlloc(newBuffSize: number) {
    const len = this.#memory.length;
    if (newBuffSize < len) {
      throw new BFRuntimeError(
        'a new buffer size is smaller than a current one',
        newBuffSize
      );
    }
    if (newBuffSize >= 2 ** 32) {
      throw new BFRuntimeError('buffer size exceeded limit', newBuffSize);
    }

    const newMemory = new Uint8Array(newBuffSize);
    newMemory.set(this.#memory);
    this.#memory = newMemory;
  }

  increment() {
    ++this.#ptr;

    if (this.#ptr >= 2 ** 32) {
      throw new BFRuntimeError('ptr address is out of range', this.#ptr);
    }

    if (this.#ptr >= this.#memory.length) {
      const newBuffSize = this.#memory.length * 2;
      this.reAlloc(newBuffSize);
    }
  }

  decrement() {
    if (this.#ptr === 0) {
      return;
    }
    --this.#ptr;
  }

  vIncrement() {
    ++this.#memory[this.#ptr];
  }

  vDecrement() {
    --this.#memory[this.#ptr];
  }
}

Object.defineProperty(BFMemory.prototype, Symbol.toStringTag, {
  value: BFMemory.name,
});
