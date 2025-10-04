import { describe, it, expect } from 'vitest';
import { BFInterpreter } from '@tktb-tess/brainf_ck-interpreter';

describe('Execute correctly...', () => {
  it('Hello world', () => {
    /** from Wikipedia */
    const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
      ---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`;
    const interpreter = new BFInterpreter(code);
    const res = interpreter.execute();
    console.log(res);
    expect(res).toBe('Hello World!\n');
  });

  it('FizzBuzz', () => {
    const code = `++++++[->++++>>+>+>-<<<<<]>[<++++>>+++>++++>>+++>+++++>+++++>>>>>>
      ++>>++<<<<<<<<<<<<<<-]<++++>+++>-->+++>->>--->++>>>+++++[->++>++<<]<<<<<<<<<<[
      ->-[>>>>>>>]>[<+++>.>.>>>>..>>>+<]<<<<<-[>>>>]>[<+++++>.>.>..>>>+<]>>>>+<-[<<<]
      <[[-<<+>>]>>>+>+<<<<<<[->>+>+>-<<<<]<]>>[[-]<]>[>>>[>.<<.<<<]<[.<<<<]>]>.<<<<<<
      <<<<<]`;

    const interpreter = new BFInterpreter(code);
    const res = interpreter.execute();
    console.log(res);
  });

  it('primes up to 100', () => {
    const code = `>++++[<++++++++>-]>++++++++[<++++++>-]<++.<.>+.<.>++.<.>++.<.>------..<.>
      .++.<.>--.++++++.<.>------.>+++[<+++>-]<-.<.>-------.+.<.> -.+++++++.<.>
      ------.--.<.>++.++++.<.>---.---.<.> +++.-.<.>+.+++.<.>--.--.<.> ++.++++.<.>
      ---.-----.<.>+++++.+.<.>.------.<.> ++++++.----.<.> ++++.++.<.> -.-----.<.>
      +++++.+.<.>.--.`;
    const intp = new BFInterpreter(code);
    const output = intp
      .execute()
      .split(' ')
      .map((n) => Number.parseInt(n))
      .filter((n) => Number.isFinite(n));
    console.log(...output);
  });

  it('square numbers up to 100^2', () => {
    const code = `++++[>+++++<-]>[<+++++>-]+<+[>[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+
      >>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]
      <<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-]`;
    const intp = new BFInterpreter(code);
    const output = intp
      .execute()
      .split('\n')
      .map((n) => Number.parseInt(n))
      .filter((n) => Number.isFinite(n));

    console.log(...output);

    expect(output.every((n, i) => n === i ** 2)).toBe(true);
  });
});
