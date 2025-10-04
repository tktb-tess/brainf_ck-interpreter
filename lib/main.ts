// 各命令の文字に対応するASCII(UTF-8)文字コード
const POINTER_INCREMENT = 0x3e;
const POINTER_DECREMENT = 0x3c;
const VALUE_INCREMENT = 0x2b;
const VALUE_DECREMENT = 0x2d;
const WRITE_CHAR = 0x2e;
const READ_CHAR = 0x2c;
const LOOP_START = 0x5b;
const LOOP_END = 0x5d;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const isCommand = (charCode: number) => {
  return (
    charCode === POINTER_INCREMENT ||
    charCode === POINTER_DECREMENT ||
    charCode === VALUE_INCREMENT ||
    charCode === VALUE_DECREMENT ||
    charCode === WRITE_CHAR ||
    charCode === READ_CHAR ||
    charCode === LOOP_START ||
    charCode === LOOP_END
  );
};

export class BFInterpreter {
  #memory: Uint8Array<ArrayBuffer>;
  #ptr: number;
  readonly #code: Uint8Array<ArrayBuffer>;
  readonly #loopMap: readonly (readonly [number, number])[];
  static readonly name = 'BFInterPreter';
  readonly [Symbol.toStringTag] = BFInterpreter.name;

  constructor(code: string, bufferLength: number = 30000) {
    this.#memory = new Uint8Array(bufferLength);
    this.#ptr = 0;
    this.#code = encoder.encode(code);
    this.#loopMap = BFInterpreter.#detectLoopPoints(this.#code);
  }

  #show() {
    const v = this.#memory.at(this.#ptr);
    if (v === undefined) {
      throw Error('referenced memory is out of range');
    }
    return v;
  }

  #increment() {
    this.#ptr += 1;

    if (this.#ptr >= 2 ** 32) {
      throw Error('ptr address is out of range');
    }

    if (this.#ptr >= this.#memory.length) {
      const newBuffSize = this.#memory.length * 2;

      if (newBuffSize >= 2 ** 32) {
        throw Error('memory size exceeds a maximum size');
      }
      const newMemory = new Uint8Array(newBuffSize);
      const entries = this.#memory.entries();

      for (const [i, v] of entries) {
        newMemory[i] = v;
      }

      this.#memory = newMemory;
    }
  }

  #decrement() {
    if (this.#ptr === 0) {
      return;
    }
    this.#ptr -= 1;
  }

  #vIncrement() {
    this.#memory[this.#ptr]++;
  }

  #vDecrement() {
    this.#memory[this.#ptr]--;
  }

  static #detectLoopPoints(code: Uint8Array) {
    const startIndex: number[] = [];
    const map: (readonly [number, number])[] = [];

    const entries = code.entries();

    for (const [i, cmd] of entries) {
      if (cmd === LOOP_START) {
        startIndex.push(i);
      } else if (cmd === LOOP_END) {
        const j = startIndex.pop();
        if (!j) {
          throw Error(`lone LOOP_END`);
        }
        map.push([j, i]);
      }
    }

    return map;
  }

  execute(input: string = '') {
    const output: number[] = [];
    const inputBytes = encoder.encode(input);
    let inputPtr = 0;
    let codePtr = 0;

    loop: while (codePtr < this.#code.length) {
      const cmd = this.#code[codePtr];

      // コマンドではないときは全てコメント扱い
      if (!isCommand(cmd)) {
        ++codePtr;
        continue loop;
      }

      switch (cmd) {
        case POINTER_INCREMENT: {
          this.#increment();
          ++codePtr;
          continue loop;
        }
        case POINTER_DECREMENT: {
          this.#decrement();
          ++codePtr;
          continue loop;
        }
        case VALUE_INCREMENT: {
          this.#vIncrement();
          ++codePtr;
          continue loop;
        }
        case VALUE_DECREMENT: {
          this.#vDecrement();
          ++codePtr;
          continue loop;
        }
        case WRITE_CHAR: {
          output.push(this.#show());
          ++codePtr;
          continue loop;
        }
        case READ_CHAR: {
          const input = inputBytes.at(inputPtr);
          if (input === undefined) {
            throw Error('input is empty');
          }
          this.#memory[this.#ptr] = input;
          ++inputPtr;
          ++codePtr;
          continue loop;
        }
        case LOOP_START: {
          if (this.#show() === 0) {
            const next = this.#loopMap.find(([i]) => i === codePtr)?.[1];

            if (next === undefined) {
              throw Error('no corresponding LOOP_END');
            }
            codePtr = next + 1;
          } else {
            ++codePtr;
          }
          continue loop;
        }
        case LOOP_END: {
          if (this.#show() !== 0) {
            const next = this.#loopMap.find(([, i]) => i === codePtr)?.[0];
            if (next === undefined) {
              throw Error('no corresponding LOOP_START');
            }
            codePtr = next + 1;
          } else {
            ++codePtr;
          }
          continue loop;
        }
        default: {
          throw Error('unexpected error');
        }
      }
    }

    return decoder.decode(Uint8Array.from(output));
  }
}
