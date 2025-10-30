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

You can also use via CDN such as jsDelivr.

```html
<!-- You can import as a global variable -->
<script src="https://cdn.jsdelivr.net/npm/@tktb-tess/brainf_ck-interpreter@0.3.0/dist/bundle.min.js" defer></script>
<script type="module">
  const { exec } = BFInterpreter;
  // ...
</script>

<!-- or as an ES module -->
<script type="module">
  import { exec } from 'https://cdn.jsdelivr.net/npm/@tktb-tess/brainf_ck-interpreter@0.3.0/+esm';
  // ...
</script>
```
