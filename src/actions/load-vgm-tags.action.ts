import type { VGMGD3Tags } from "../interfaces/VGMGd3Tags";
import { VGMError } from "../errors/VGMError.error";
import { GD3_RELATIVE_OFFSETS } from "../constants/gd3-constants";
import { VGM_OFFSETS } from "../constants/vgm-constants";

//IMPORTANT! vgmFileData must be uncompressed
export const loadVGMTagsAction = async (vgmFileData: Uint8Array<ArrayBuffer>): Promise<VGMGD3Tags> => {

    //Check if vgm file is valid trhought ident
    const vgmFileDataBuffer = vgmFileData.buffer;
    const textDecoder = new TextDecoder("utf-8");
    try {
        const vgmIdent = textDecoder.decode(new Uint8Array(vgmFileDataBuffer, VGM_OFFSETS.VGM_IDENT, Uint32Array.BYTES_PER_ELEMENT));
        if (vgmIdent !== "Vgm ") {
            throw new VGMError(
                'VGM_BAD_IDENT_ERROR',
                "Invalid VGM ident",
                'Invalid VGM File'
            );
        }
    } catch (error) {
        if (error instanceof VGMError) throw error;
        throw new VGMError(
            'VGM_READ_IDENT_ERROR',
            'Error reading VGM ident',
            "VGM file couldn't be read",
            error
        );
    }

    //Check for GD3Tags
    const dataView = new DataView(vgmFileDataBuffer);
    let gd3RelativeOffset = 0x00;
    try {
        gd3RelativeOffset = dataView.getUint32(VGM_OFFSETS.GD3_RELATIVE_OFFSET, true);
    } catch (error) {
        throw new VGMError('VGM_GD3_OFFSET_READ_ERROR', 'Error reading GD3 offset in header', "GD3 tags couldn't be read", error);
    }

    if (gd3RelativeOffset == 0x00)
        throw (new VGMError('VGM_NO_GD3_TAGS_ERROR', "VGM file without GD3 Tags", "VGM file doesn't have GD3 tags. Loading file with empty GD3 Tags"))

    const gd3Offset = gd3RelativeOffset + VGM_OFFSETS.GD3_RELATIVE_OFFSET;

    //Check GD3 tags ident
    try {
        const gd3Ident = textDecoder.decode(new Uint8Array(vgmFileDataBuffer, gd3Offset, Uint32Array.BYTES_PER_ELEMENT));
        if (gd3Ident !== "Gd3 ")
            throw new VGMError('VGM_BAD_GD3_IDENT_ERROR', 'Invalid GD3 ident', '');
    } catch (error) {
        if (error instanceof VGMError) throw error;
        throw new VGMError('VGM_GD3_IDENT_READ_ERROR', 'GD3 Ident reading error', '', error);
    }

    //Decode and parse GD3 tags
    try {
        const gd3Version = dataView.getUint32(gd3Offset + GD3_RELATIVE_OFFSETS.GD3_VERSION, true);
        const gd3TagsLength = dataView.getUint32(gd3Offset + GD3_RELATIVE_OFFSETS.GD3_TAGS_LENGTH, true);
        const textDecoder = new TextDecoder("utf-16");
        const gd3Tags = textDecoder.decode(new Uint8Array(vgmFileDataBuffer, gd3Offset + GD3_RELATIVE_OFFSETS.GD3_TAGS, gd3TagsLength))
        const splittedGd3Tags = gd3Tags.split("\0");
        return {
            gd3RelativeOffset,
            gd3Version,
            tagsEnglish: {
                trackName: splittedGd3Tags[0],
                gameName: splittedGd3Tags[2],
                systemName: splittedGd3Tags[4],
                authorName: splittedGd3Tags[6],
            },
            tagsNonEnglish: {
                trackName: splittedGd3Tags[1],
                gameName: splittedGd3Tags[3],
                systemName: splittedGd3Tags[5],
                authorName: splittedGd3Tags[7]
            },
            releaseDate: splittedGd3Tags[8],
            vgmCreator: splittedGd3Tags[9],
            notes: splittedGd3Tags[10],
        }
    } catch (error) {
        throw new VGMError('VGM_GD3_TAGS_READ_ERROR', 'Error reading GD3 tags', "Error reading GD3 tags", error);
    }
}