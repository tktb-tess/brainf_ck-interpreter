const commands = ['>', '<', '+', '-', '.', ',', '[', ']'] as const;

export class BFInterpreter {
  #memory: Uint8Array<ArrayBuffer>;
  #ptr_: Uint32Array<ArrayBuffer>;

  constructor(bufferLength: number = 30000) {
    this.#memory = new Uint8Array(bufferLength);
    this.#ptr_ = new Uint32Array(1);
  }

  get #ptr() {
    return this.#ptr_.at(0)!;
  }

  set #ptr(v: number) {
    if (v < 0 || v >= 2 ** 32) {
      throw Error('ptr value is out of range');
    }
    this.#ptr_[0] = v;
  }

  #show() {
    const v = this.#memory.at(this.#ptr);
    if (v === undefined) {
      throw SyntaxError('referenced memory is out of range');
    }
    return String.fromCharCode(v);
  }

  #increment() {
    this.#ptr += 1;
    if (this.#ptr >= this.#memory.length) {
      const newMemory = new Uint8Array(this.#ptr * 2);

      for (let i = 0; i < this.#memory.length; i++) {
        newMemory[i] = this.#memory.at(i)!;
      }

      this.#memory = newMemory;
    }
  }
}
