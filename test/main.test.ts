import { describe, it, expect } from 'vitest';
import { exec } from '@tktb-tess/brainf_ck-interpreter';

describe('Execute correctly...', () => {
  it('Hello world', () => {
    /** from Wikipedia */
    const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
      ---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`;
    const output = exec(code).trim();
    // console.log(output);
    expect(output).toBe('Hello World!');
  });

  it('FizzBuzz', () => {
    const code = `++++++[->++++>>+>+>-<<<<<]>[<++++>>+++>++++>>+++>+++++>+++++>>>>>>
      ++>>++<<<<<<<<<<<<<<-]<++++>+++>-->+++>->>--->++>>>+++++[->++>++<<]<<<<<<<<<<[
      ->-[>>>>>>>]>[<+++>.>.>>>>..>>>+<]<<<<<-[>>>>]>[<+++++>.>.>..>>>+<]>>>>+<-[<<<]
      <[[-<<+>>]>>>+>+<<<<<<[->>+>+>-<<<<]<]>>[[-]<]>[>>>[>.<<.<<<]<[.<<<<]>]>.<<<<<<
      <<<<<]`;

    const output = exec(code).split('\n').slice(0, -1);

    const fizzBuzz = [...Array(100)].map((_, _i) => {
      const i = _i + 1;

      if (i % 15 === 0) {
        return 'FizzBuzz';
      } else if (i % 3 === 0) {
        return 'Fizz';
      } else if (i % 5 === 0) {
        return 'Buzz';
      } else {
        return i.toString();
      }
    });
    // console.log(...output);
    expect(output).toStrictEqual(fizzBuzz);
  });

  it('primes up to 100', () => {
    const code = `>++++[<++++++++>-]>++++++++[<++++++>-]<++.<.>+.<.>++.<.>++.<.>------..<.>
      .++.<.>--.++++++.<.>------.>+++[<+++>-]<-.<.>-------.+.<.> -.+++++++.<.>
      ------.--.<.>++.++++.<.>---.---.<.> +++.-.<.>+.+++.<.>--.--.<.> ++.++++.<.>
      ---.-----.<.>+++++.+.<.>.------.<.> ++++++.----.<.> ++++.++.<.> -.-----.<.>
      +++++.+.<.>.--.`;

    const output = exec(code)
      .split(' ')
      .map((n) => Number.parseInt(n));
    const v_ = [...Array(99)]
      .map((_, i) => i + 2)
      .filter((n) => n % 2 && n % 3 && n % 5 && n % 7);

    const verif = [2, 3, 5, 7, ...v_];
    // console.log(...output);
    expect(output).toStrictEqual(verif);
  });

  it('square numbers up to 100^2', () => {
    const code = `++++[>+++++<-]>[<+++++>-]+<+[>[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+
      >>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]
      <<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-]`;

    const output = exec(code)
      .split('\n')
      .map((n) => Number.parseInt(n))
      .filter((n) => Number.isFinite(n));

    // console.log(...output);

    expect(output.every((n, i) => n === i ** 2)).toBe(true);
  });
});

it('avoid infinite loop', () => {
  const code = '+[><]';

  expect(() => exec(code)).toThrowError(/exceeded/);
});
