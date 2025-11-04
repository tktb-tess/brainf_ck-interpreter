interface BFRuntimeError extends Error {
  readonly message: string;
  readonly stack?: string;
  readonly cause?: unknown;
}

const _N = 'BFRuntimeError';

class BFRuntimeError extends Error {
  static override readonly name = _N;

  override get name(): 'BFRuntimeError' {
    return _N;
  }

  get [Symbol.toStringTag](): 'BFRuntimeError' {
    return _N;
  }

  constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}

export { BFRuntimeError };
