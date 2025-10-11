import { BFMemory } from './bf-memory';
import {
  isCommand,
  POINTER_INCREMENT,
  POINTER_DECREMENT,
  VALUE_INCREMENT,
  VALUE_DECREMENT,
  READ_MEMORY,
  WRITE_MEMORY,
  LOOP_START,
  LOOP_END,
} from './commands';
import { BFRuntimeError } from './error';
export {
  BFMemory,
  BFRuntimeError,
  isCommand,
  POINTER_INCREMENT,
  POINTER_DECREMENT,
  VALUE_INCREMENT,
  VALUE_DECREMENT,
  READ_MEMORY,
  WRITE_MEMORY,
  LOOP_START,
  LOOP_END,
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const detectLoopPoints = (
  code: Uint8Array<ArrayBuffer>
): readonly (readonly [number, number])[] => {
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

  let counter = 0;
  const LIMIT = 2 ** 28;
  loop: while (codePtr < codeBytes.length) {
    ++counter;
    if (counter > LIMIT) {
      throw new BFRuntimeError('loop count exceeded limit', output);
    }
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
