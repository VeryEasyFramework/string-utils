import { ControlChar, controlChars } from "./bytesMessageReader.ts";

export class BytesMessage {
  buffer: Uint8Array;
  offset: number;
  size: number;

  encoder: TextEncoder = new TextEncoder();

  constructor() {
    this.size = 1024;
    this.offset = 0;

    this.buffer = new Uint8Array(this.size);
  }
  copy(src: Uint8Array, dst: Uint8Array, off = 0): number {
    off = Math.max(0, Math.min(off, dst.byteLength));
    const dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
      src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
  }
  encode(data: string): Uint8Array {
    return this.encoder.encode(data);
  }

  ensure(size: number): void {
    const remaining = this.buffer.length - this.offset;
    if (remaining < size) {
      const oldBuffer = this.buffer;
      // exponential growth factor of around ~ 1.5
      // https://stackoverflow.com/questions/2269063/#buffer-growth-strategy
      const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
      this.buffer = new Uint8Array(newSize);
      this.copy(oldBuffer, this.buffer);
    }
  }

  addCString(string?: string): BytesMessage {
    // just write a 0 for empty or null strings
    if (!string) {
      this.ensure(1);
    } else {
      const encodedStr = this.encode(string);
      this.ensure(encodedStr.byteLength + 1); // +1 for null terminator
      this.copy(encodedStr, this.buffer, this.offset);
      this.offset += encodedStr.byteLength;
    }

    this.buffer[this.offset++] = 0; // null terminator
    return this;
  }
  addString(string: string): BytesMessage {
    const encodedStr = this.encode(string);
    this.ensure(encodedStr.byteLength);
    this.copy(encodedStr, this.buffer, this.offset);
    this.offset += encodedStr.byteLength;

    return this;
  }

  addControlChar(char: ControlChar): BytesMessage {
    this.ensure(1);
    this.buffer[this.offset++] = controlChars[char];
    return this;
  }
  addBoolean(value: boolean): BytesMessage {
    this.ensure(1);
    this.buffer[this.offset++] = value ? 1 : 0;
    return this;
  }

  addInt(num: number): BytesMessage {
    return this.addInt32(num);
  }

  addInt32(num: number): BytesMessage {
    this.ensure(4);
    this.buffer[this.offset++] = (num >>> 24) & 0xff;
    this.buffer[this.offset++] = (num >>> 16) & 0xff;
    this.buffer[this.offset++] = (num >>> 8) & 0xff;
    this.buffer[this.offset++] = (num >>> 0) & 0xff;
    return this;
  }

  addInt16(num: number): BytesMessage {
    this.ensure(2);
    this.buffer[this.offset++] = (num >>> 8) & 0xff;
    this.buffer[this.offset++] = (num >>> 0) & 0xff;
    return this;
  }

  addNegativeOne(): BytesMessage {
    this.ensure(4);
    this.buffer[this.offset++] = 255;
    this.buffer[this.offset++] = 255;
    this.buffer[this.offset++] = 255;
    this.buffer[this.offset++] = 255;
    return this;
  }
  addByte(num: number): BytesMessage {
    this.ensure(1);
    this.buffer[this.offset++] = num;
    return this;
  }
  addBytes(data: Uint8Array): BytesMessage {
    this.ensure(data.byteLength);
    this.copy(data, this.buffer, this.offset);
    this.offset += data.byteLength;
    return this;
  }

  addNUL(): BytesMessage {
    this.ensure(1);
    this.buffer[this.offset++] = 0;
    return this;
  }

  get content(): Uint8Array {
    const data = this.buffer.slice(0, this.offset);
    this.reset();
    return data;
  }

  reset() {
    this.offset = 5;
  }
}
