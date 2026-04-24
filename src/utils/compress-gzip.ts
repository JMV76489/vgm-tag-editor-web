import * as fflate from 'fflate';

export const compressGzip = async (uncompressedFileData: Uint8Array<ArrayBuffer>): Promise<Uint8Array<ArrayBuffer>> => {
    return new Promise((resolve, reject) => {
        fflate.compress(uncompressedFileData, (compressionError, compressedData) => {
            if (compressionError)
                reject(compressionError);
            else
                resolve(compressedData as Uint8Array<ArrayBuffer>);
        })
    })
}