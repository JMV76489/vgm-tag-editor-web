import type { VGMGD3Tags } from "../interfaces/VGMGd3Tags";
import { encodeUTF16 } from "../utils/encode-utf-16";
import { VGM_OFFSETS } from "../constants/vgm-constants";
import { GD3_HEADERS_LENGTH, GD3_IDENT_UINT32, GD3_RELATIVE_OFFSETS } from "../constants/gd3-constants";

export const editVGMFileAction = (vgmFileData: Uint8Array<ArrayBuffer>, vgmTags: VGMGD3Tags) => {
    
    //Parse and encode GD3 tags
    const gd3TagsArray =
        [
            vgmTags.tagsEnglish.trackName,
            vgmTags.tagsNonEnglish.trackName,
            vgmTags.tagsEnglish.gameName,
            vgmTags.tagsNonEnglish.gameName,
            vgmTags.tagsEnglish.systemName,
            vgmTags.tagsNonEnglish.systemName,
            vgmTags.tagsEnglish.authorName,
            vgmTags.tagsNonEnglish.authorName,
            vgmTags.releaseDate,
            vgmTags.vgmCreator,
            vgmTags.notes
        ];

    let gd3Offset = vgmTags.gd3RelativeOffset + VGM_OFFSETS.GD3_RELATIVE_OFFSET;

    if (vgmTags.gd3RelativeOffset == 0)
        gd3Offset = vgmFileData.length

    const gd3TagsString = gd3TagsArray.join('\0') + '\0';
    const encodedGd3TagsString = encodeUTF16(gd3TagsString);

    //Remove old GD3 tags part in file and attach it with the new one
    const trimmedGD3TagsVGMFileData = new Uint8Array(vgmFileData.slice(0x00, gd3Offset).buffer);

    const updatedVGMFileData = new Uint8Array(gd3Offset + GD3_HEADERS_LENGTH + encodedGd3TagsString.length);
    updatedVGMFileData.set(trimmedGD3TagsVGMFileData, 0);

    const dataView = new DataView(updatedVGMFileData.buffer);

    dataView.setUint32(VGM_OFFSETS.GD3_RELATIVE_OFFSET, gd3Offset - VGM_OFFSETS.GD3_RELATIVE_OFFSET, true);
    dataView.setUint32(gd3Offset, GD3_IDENT_UINT32);
    dataView.setUint32(gd3Offset + GD3_RELATIVE_OFFSETS.GD3_VERSION, vgmTags.gd3Version, true);
    dataView.setUint32(gd3Offset + GD3_RELATIVE_OFFSETS.GD3_TAGS_LENGTH, encodedGd3TagsString.length, true);

    updatedVGMFileData.set(encodedGd3TagsString, gd3Offset + GD3_RELATIVE_OFFSETS.GD3_TAGS);

    return updatedVGMFileData;
}