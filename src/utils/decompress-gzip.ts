import * as fflate from 'fflate'

export const decompressGzip = async (compressedFileData: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> => {
    return new Promise((resolve, reject) => {
        fflate.decompress(compressedFileData, (decompressionData, decompressedData) => {
            if (decompressionData)
                reject(decompressionData);
            else
                resolve(decompressedData as Uint8Array<ArrayBuffer>);
        });
    });
}