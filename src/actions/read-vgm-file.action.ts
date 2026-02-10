export const readVGMFile = async (file: File) => {
    return await file.arrayBuffer();
}