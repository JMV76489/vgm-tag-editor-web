export const isVGMCompressed = (vgmFileData: Uint8Array<ArrayBuffer>) => {
    const dataView = new DataView(vgmFileData.buffer);
    const magicNumber = dataView.getUint16(0);
    return (magicNumber == 0x1f8b)
}