export const loadVGMFileAction = async (vgmFile: File): Promise<Uint8Array<ArrayBuffer>> => {
    const vgmFileData = await vgmFile.bytes();
    return vgmFileData;
}