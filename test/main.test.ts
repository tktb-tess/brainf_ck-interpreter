import { describe, it, expect } from 'vitest';
import { BFInterpreter } from 'brainf_ck-interpreter';

describe('Execute correctly...', () => {
  const interpreter = new BFInterpreter();
  it('Hello world', () => {
    /** from Wikipedia */
    const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`;
    const res = interpreter.execute(code, '');
    console.log(res);
    expect(res).toBe('Hello World!\n');
  });
});
