export class BFRuntimeError extends Error {
  override readonly name = 'BFRuntimeError';
  readonly [Symbol.toStringTag] = BFRuntimeError.prototype.name;

  constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}
