import { exec } from '@tktb-tess/brainf_ck-interpreter';

const app = document.getElementById('app')!;
const code = `++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.`;

app.innerHTML = `<p>${exec(code)}</p>`;
