# Brainf\*ck Interpreter

A brainf\*ck interpreter written by TypeScript

## Usage

```ts
import { exec } from '@tktb-tess/brainf_ck-interpreter';

// sample that outputs 'Hello World!\n' from Wikipedia
const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
  ---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`;
const output = exec(code);
console.log(output); // Hello World!\n
```
