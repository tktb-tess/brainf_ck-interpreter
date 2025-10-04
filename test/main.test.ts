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
    const output = intp.execute();
    console.log(output);
  });

  it('square numbers up to 100^2', () => {
    const code = `++++[>+++++<-]>[<+++++>-]+<+[>[>+>+<<-]++>>[<<+>>-]>>>[-]++>[-]+
      >>>+[[-]++++++>>>]<<<[[<++++++++<++>>-]+<.<[>----<-]<]
      <<[>>>>>[>>>[-]+++++++++<[>-<-]+++++++++>[-[<->-]+[<<<]]<[>+<-]>]<<-]<<-]`;
    const intp = new BFInterpreter(code);
    const output = intp.execute();
    console.log(output);
  })
});
