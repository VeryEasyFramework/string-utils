export const controlChars = {
  NUL: 0x00,
  SOH: 0x01,
  STX: 0x02,
  ETX: 0x03,
  EOT: 0x04,
  ENQ: 0x05,
  ACK: 0x06,
  BEL: 0x07,
  BS: 0x08,
  HT: 0x09,
  LF: 0x0a,
  VT: 0x0b,
  FF: 0x0c,
  CR: 0x0d,
  SO: 0x0e,
  SI: 0x0f,
  DLE: 0x10,
  DC1: 0x11,
  DC2: 0x12,
  DC3: 0x13,
  DC4: 0x14,
  NAK: 0x15,
  SYN: 0x16,
  ETB: 0x17,
  CAN: 0x18,
  EM: 0x19,
  SUB: 0x1a,
  ESC: 0x1b,
  FS: 0x1c,
  GS: 0x1d,
  RS: 0x1e,
  US: 0x1f,

  DEL: 0x7f,

  // C0 control characters
  PAD: 0x80,
  HOP: 0x81,
  BPH: 0x82,
  NBH: 0x83,
  IND: 0x84,
  NEL: 0x85,
  SSA: 0x86,
  ESA: 0x87,
  HTS: 0x88,
  HTJ: 0x89,
  VTS: 0x8a,
  PLD: 0x8b,
  PLU: 0x8c,
  RI: 0x8d,
  SS2: 0x8e,
  SS3: 0x8f,
  DCS: 0x90,
  PU1: 0x91,
  PU2: 0x92,
  STS: 0x93,
  CCH: 0x94,
  MW: 0x95,
  SPA: 0x96,

  // C1 control characters
  EPA: 0x97,
  SOS: 0x98,
  SGCI: 0x99,
  SCI: 0x9a,
  CSI: 0x9b,
  ST: 0x9c,
  OSC: 0x9d,
  PM: 0x9e,
  APC: 0x9f,

  // 8-bit control characters
  NBSP: 0xa0,
};
export type ControlChar = keyof typeof controlChars;

export class BytesMessageReader {
  offset: number;
  size: number;
  buffer: Uint8Array;

  data: Uint8Array = new Uint8Array();
  readableStream: ReadableStream<Uint8Array>;

  decoder = new TextDecoder();

  constructor(readableStream: ReadableStream<Uint8Array>) {
    this.offset = 0;
    this.size = 1024;
    this.readableStream = readableStream;
    this.buffer = new Uint8Array(this.size);
  }
  onOutput(callback: (data: Uint8Array) => void) {
    const stdStream = new WritableStream<Uint8Array>({
      write(chunk) {
        callback(new Uint8Array(chunk));
        // callback(chunk);
      },
    });

    this.readableStream.pipeTo(stdStream);
  }

  get done(): Promise<void> {
    return this.readableStream.getReader().closed;
  }

  readUntil(controlChar: ControlChar) {
    const index = this.data.indexOf(controlChars[controlChar], this.offset);
    const result = this.data.slice(this.offset, index);
    this.offset = index + 1;
    return this.decode(result);
  }
  readAll() {
    const result = this.data.slice(this.offset);
    this.offset = this.data.length;
    return this.decode(result);
  }

  readByte() {
    const byte = this.data[this.offset];
    this.offset++;
    return byte;
  }
  readBytes(count: number) {
    const slice = this.data.slice(this.offset, this.offset + count);
    this.offset += count;
    return slice;
  }
  readUntilNewLine() {
    const data: number[] = [];
    while (true) {
      // check for \r\n
      let byte = this.data[this.offset];
      this.offset++;
      if (this.offset < this.data.length) {
        let nextByte = this.data[this.offset];
        if (byte === controlChars.CR && nextByte === controlChars.LF) {
          this.offset++;
          return this.decode(new Uint8Array(data));
        }
      }
      data.push(byte);
      if (this.offset === this.data.length) {
        return this.decode(new Uint8Array(data));
      }
    }
  }

  readUntilChar(char: string): string | null {
    const index = this.data.indexOf(char.charCodeAt(0), this.offset);
    if (index === -1) {
      return null;
    }
    const result = this.data.slice(this.offset, index);
    this.offset = index + 1;
    return this.decode(result);
  }
  isAsciiPrintable(byte: number) {
    return byte >= 32 && byte <= 126;
  }
  readChars(count: number, replaceControlChars?: boolean) {
    const slice = this.data.slice(this.offset, this.offset + count);
    let result = "";
    for (let i = 0; i < slice.length; i++) {
      const byte = slice[i];
      if (replaceControlChars) {
        const char = getControlChar(byte);
        if (char) {
          if (char === "NUL") {
            result += `[${char}]`;
            continue;
          }
          result += `[${char}]`;
          continue;
        }
      }
      const char = getControlChar(byte);
      if (!char && !this.isAsciiPrintable(byte)) {
        const hex = this.convertToHex(new Uint8Array([byte]));
        result += hex;
        continue;
      }

      result += String.fromCharCode(byte);
    }
    this.offset += count;
    return result;
  }

  convertToHex(data: Uint8Array) {
    let result = "";
    for (let i = 0; i < data.length; i++) {
      const byte = data[i];
      const hex = byte.toString(16).padStart(2, "0");
      result += `0x${hex} `;
      // result += byte.toString(16).padStart(2, "0");
    }
    return result;
  }

  readInt32() {
    const num = new DataView(this.data.buffer).getInt32(
      this.offset,
      false,
    );
    this.offset += 4;
    return num;
  }
  decode(data: Uint8Array) {
    return this.decoder.decode(data);
  }

  readUntilNull() {
    let byte = this.data[this.offset];
    const data: number[] = [];
    while (true) {
      if (byte === controlChars.NUL) {
        const nextNulls = this.readBytes(2);
        if (nextNulls[0] === controlChars.NUL) {
          this.offset += 2;
          return this.decode(new Uint8Array(data));
        }
      }
      data.push(byte);
      this.offset++;
      byte = this.data[this.offset];
    }
  }
}

export function getControlChar(byte: number) {
  for (const key in controlChars) {
    if (controlChars[key as ControlChar] === byte) {
      return key;
    }
  }
  return null;
}
