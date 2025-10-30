export { BFRuntimeError } from './error';
export { BFMemory } from './/bf-memory';
export { exec } from './exec';
import AsyncWorker from '@tktb-tess/async-worker';

const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
});

const aWorker = new AsyncWorker<
  {
    code: string;
    options: { input?: string; initBuffLength?: number };
  },
  string
>(worker);


/**
 * **Only available in browser** \
 * `node:worker_threads` version is coming soon ...
 * @param code 
 * @param options 
 * @returns 
 */
export const execWithWorker = async (
  code: string,
  options: { input?: string; initBuffLength?: number } = {}
) => {
  aWorker.postMessage({ code, options });

  const r = await aWorker.receive();

  if (r === undefined) {
    return Promise.reject(Error('Failed to get answer'));
  }

  return r;
};
