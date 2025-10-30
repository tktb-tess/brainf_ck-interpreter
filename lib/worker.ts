import { exec } from './exec';

globalThis.onmessage = (
  e: MessageEvent<
    [
      number,
      {
        code: string;
        options: { input?: string; initBuffLength?: number };
      }
    ]
  >
) => {
  const [id, { code, options }] = e.data;

  try {
    const res = exec(code, options);
    postMessage([id, res]);
  } catch (e) {
    if (e instanceof Error) {
      throw [id, e];
    } else {
      throw [id, Error('UnidentifiedError', { cause: e })];
    }
  }
};
