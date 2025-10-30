import { execSync } from './exec';

globalThis.onmessage = (e) => {
  const [id, { code, options }] = e.data as [
    number,
    {
      code: string;
      options: { input?: string; initBuffLength?: number };
    }
  ];

  const res = execSync(code, options);
  postMessage([id, res]);
};
