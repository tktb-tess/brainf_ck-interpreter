interface BFRuntimeError extends Error {
  readonly message: string;
  readonly stack?: string;
  readonly cause?: unknown;
}

class BFRuntimeError extends Error {
  static override readonly name = 'BFRuntimeError';
  override readonly name = BFRuntimeError.name;
  readonly [Symbol.toStringTag] = BFRuntimeError.name;

  constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}

export { BFRuntimeError };
