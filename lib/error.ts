interface BFRuntimeError extends Error {
  readonly message: string;
  readonly stack?: string;
  readonly cause?: unknown;
}

class BFRuntimeError extends Error {
  static override readonly name = 'BFRuntimeError';

  constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}

Object.defineProperties(BFRuntimeError.prototype, {
  [Symbol.toStringTag]: {
    value: BFRuntimeError.name,
  },
  name: {
    value: BFRuntimeError.name,
    enumerable: true,
  },
});

export { BFRuntimeError };
