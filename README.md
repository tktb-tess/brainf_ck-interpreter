# Brainf\*ck Interpreter

A brainf\*ck interpreter written by TypeScript

## Usage

```ts
import { BFInterPreter } from '@tktb-tess/brainf_ck-interpreter';

// sample that outputs 'Hello World!\n' from wikipedia
const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
  ---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`;
const intp = new BFInterpreter(code);
const output = intp.execute();
console.log(output); // Hello World!\n
```
