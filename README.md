# Brainf\*ck Interpreter

A simple brainf\*ck interpreter written by TypeScript

## Usage

```ts
import { exec } from '@tktb-tess/brainf_ck-interpreter';

// code sample that outputs 'Hello World!\n'
// source from Wikipedia
const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>
  ---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.`;
const output = exec(code);
console.log(output); // Hello World!\n
```
