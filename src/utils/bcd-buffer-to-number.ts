export const bcdBufferToNumber = (buffer: Uint8Array) => {
    let result = 0;
    let tenMultiplier = 1;
    for (const byte of buffer) {
        result += ((byte >> 4) * 10 + (byte & 0x0f)) * tenMultiplier;
        tenMultiplier *= 100;
    }
    return result;
};