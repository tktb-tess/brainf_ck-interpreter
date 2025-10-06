// 各命令の文字に対応するASCII(UTF-8)文字コード
/** `>` */
const POINTER_INCREMENT = 0x3e;
/** `<` */
const POINTER_DECREMENT = 0x3c;
/** `+` */
const VALUE_INCREMENT = 0x2b;
/** `-` */
const VALUE_DECREMENT = 0x2d;
/** `.` */
const WRITE_MEMORY = 0x2e;
/** `,` */
const READ_MEMORY = 0x2c;
/** `[` */
const LOOP_START = 0x5b;
/** `]` */
const LOOP_END = 0x5d;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const isCommand = (charCode: number) => {
  return (
    charCode === POINTER_INCREMENT ||
    charCode === POINTER_DECREMENT ||
    charCode === VALUE_INCREMENT ||
    charCode === VALUE_DECREMENT ||
    charCode === WRITE_MEMORY ||
    charCode === READ_MEMORY ||
    charCode === LOOP_START ||
    charCode === LOOP_END
  );
};

class BFMemory {
  #memory: Uint8Array<ArrayBuffer>;
  #ptr: number;

  constructor(bufferLength: number) {
    this.#memory = new Uint8Array(bufferLength);
    this.#ptr = 0;
  }

  get current() {
    const v = this.#memory.at(this.#ptr);
    if (v === undefined) {
      throw Error('referenced memory is out of range');
    }
    return v;
  }

  set current(n) {
    if (this.#memory[this.#ptr] === undefined) {
      throw Error('referenced memory is out of range');
    }
    this.#memory[this.#ptr] = n;
  }

  reAlloc(newBuffSize: number) {
    if (newBuffSize < this.#memory.length) {
      throw Error('new buffer size is smaller than current buffer size');
    }
    if (newBuffSize >= 2 ** 32) {
      throw Error('memory size exceeds a maximum size');
    }

    const newMemory = new Uint8Array(newBuffSize);
    const len = this.#memory.length;

    for (let i = 0; i < len; ++i) {
      newMemory[i] = this.#memory[i];
    }

    this.#memory = newMemory;
  }

  increment() {
    ++this.#ptr;

    if (this.#ptr >= 2 ** 32) {
      throw Error('ptr address is out of range');
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

const detectLoopPoints = (code: Uint8Array<ArrayBuffer>) => {
  const startIndex: number[] = [];
  const map: (readonly [number, number])[] = [];
  const len = code.length;

  for (let i = 0; i < len; ++i) {
    const cmd = code[i];
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
};

export const exec = (
  code: string,
  options?: { input?: string; initBuffLength?: number }
) => {
  const input = options?.input ?? '';
  const initBuffLength = options?.initBuffLength ?? 30000;
  const bfMemory = new BFMemory(initBuffLength);
  const output: number[] = [];
  const inputBytes = encoder.encode(input);
  let inputPtr = 0;
  const codeBytes = encoder.encode(code);
  let codePtr = 0;
  const loopMap = detectLoopPoints(codeBytes);

  loop: while (codePtr < codeBytes.length) {
    const cmd = codeBytes[codePtr];

    // コマンドではないときは全てコメント扱い
    if (!isCommand(cmd)) {
      ++codePtr;
      continue loop;
    }

    switch (cmd) {
      case POINTER_INCREMENT: {
        bfMemory.increment();
        ++codePtr;
        continue loop;
      }
      case POINTER_DECREMENT: {
        bfMemory.decrement();
        ++codePtr;
        continue loop;
      }
      case VALUE_INCREMENT: {
        bfMemory.vIncrement();
        ++codePtr;
        continue loop;
      }
      case VALUE_DECREMENT: {
        bfMemory.vDecrement();
        ++codePtr;
        continue loop;
      }
      case WRITE_MEMORY: {
        output.push(bfMemory.current);
        ++codePtr;
        continue loop;
      }
      case READ_MEMORY: {
        const input = inputBytes.at(inputPtr);
        if (input === undefined) {
          throw Error('input is empty');
        }
        bfMemory.current = input;
        ++inputPtr;
        ++codePtr;
        continue loop;
      }
      case LOOP_START: {
        if (bfMemory.current === 0) {
          const next = loopMap.find(([i]) => i === codePtr)?.[1];

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
        if (bfMemory.current !== 0) {
          const next = loopMap.find(([, i]) => i === codePtr)?.[0];
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
};
