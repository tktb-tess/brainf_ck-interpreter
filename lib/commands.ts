// 各命令の文字に対応するASCII(UTF-8)文字コード
/** `>` */
export const POINTER_INCREMENT = 0x3e;
/** `<` */
export const POINTER_DECREMENT = 0x3c;
/** `+` */
export const VALUE_INCREMENT = 0x2b;
/** `-` */
export const VALUE_DECREMENT = 0x2d;
/** `.` */
export const WRITE_MEMORY = 0x2e;
/** `,` */
export const READ_MEMORY = 0x2c;
/** `[` */
export const LOOP_START = 0x5b;
/** `]` */
export const LOOP_END = 0x5d;

export const isCommand = (charCode: number) => {
  return (
    charCode === POINTER_INCREMENT ||
    charCode === POINTER_DECREMENT ||
    charCode === VALUE_INCREMENT ||
    charCode === VALUE_DECREMENT ||
    charCode === WRITE_MEMORY ||
    charCode === READ_MEMORY ||
    charCode === LOOP_START ||
    charCode === LOOP_END
  );
};
