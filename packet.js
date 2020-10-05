const headerSize = 16; // 16 Bytes

class Packet {
    constructor(data = null) {
        this.buffer = data ? data : Buffer.alloc(1024);
        this.offset = headerSize;
        this.id = data ? data.readInt16LE(2) : 0;
    }

    setId(id) {
        this.id = id;
    }

    build() {
        this.buffer.writeInt16LE(this.offset, 0);
        this.buffer.writeInt16LE(this.id, 2);
        return this.buffer.slice(0, this.offset);
    }

    writeString(data) {
        const ascii = Buffer.from(data, "ascii");
        this.buffer.writeInt32LE(ascii.length, this.offset);
        this.offset += 4; // Because int 32

        ascii.copy(this.buffer, this.offset);
        this.offset += ascii.length; // Str length
    }

    readString() {
        const strLen = this.buffer.readInt32LE(this.offset);
        this.offset += 4; // Because int 32

        const buff = this.buffer.slice(this.offset, this.offset + strLen)
        this.offset += strLen;
        return buff.toString("ascii");
    }

    writeFloat(data) {
        this.buffer.writeFloatLE(data, this.offset);
        this.offset += 4; // Because float is 4 bytes
    }

    readFloat() {
        const buff = this.buffer.readFloatLE(this.offset);
        this.offset += 4; // Because float is 4 bytes
        return buff;
    }

    writeWord(data) {
        this.buffer.writeInt16LE(data, this.offset);
        this.offset += 2; // Because word is 2 bytes
    }

    readWord() {
        const buff = this.buffer.readInt16LE(this.offset);
        this.offset += 2; // Because word is 2 bytes
        return buff;
    }

    writeByte(data) {
        this.buffer.writeInt8(data, this.offset);
        this.offset += 1;
    }

    readByte() {
        const buff = this.buffer.readInt8(this.offset);
        this.offset += 1;
        return buff;
    }

    writeDWord(data) {
        this.buffer.writeInt32LE(data, this.offset);
        this.offset += 4; // Because int 32
    }

    readDWord() {
        const buff = this.buffer.readInt32LE(this.offset);
        this.offset += 4; // Because int 32
        return buff;
    }
}

exports.Packet = Packet;