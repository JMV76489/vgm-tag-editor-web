import { VGM_OFFSETS } from "../constants/vgm-offsets";
import type { VGMData } from "../interfaces/vgm-data";
import { encodeUTF16 } from "../utils/encode-utf16";
import { downloadVGMFile } from "./download-vgm-file.action";

export const saveVGMData = (vgmData: VGMData, vgmFileData: ArrayBuffer, vgmFileName: string) => {

    //Set the static header data
    const dataView = new DataView(vgmFileData);
    const versionBCD = `${vgmData.versionInteger}`.padStart(6, "0") + `${vgmData.versionDecimal}`.padStart(2, "0")
    dataView.setUint32(VGM_OFFSETS.VERSION, parseInt(versionBCD, 16), true);
    dataView.setUint32(VGM_OFFSETS.RATE, vgmData.rate, true);

    //Process gd3tags data
    const gd3TagsArray = [
        vgmData.gd3Data.trackNameEnglish,
        vgmData.gd3Data.trackNameNonEnglish,
        vgmData.gd3Data.gameNameEnglish,
        vgmData.gd3Data.gameNameNonEnglish,
        vgmData.gd3Data.systemNameEnglish,
        vgmData.gd3Data.systemNameNonEnglish,
        vgmData.gd3Data.originalAuthorEnglish,
        vgmData.gd3Data.originalAuthorNonEnglish,
        vgmData.gd3Data.gameReleaseDate,
        vgmData.gd3Data.vgmCreator,
        vgmData.gd3Data.notes,
    ]

    const gd3TagsString = gd3TagsArray.join('\0') + "\0";
    const encodedGd3Tags = encodeUTF16(gd3TagsString);

    //Set header data relative to gd3tags
    dataView.setUint32(vgmData.gd3Offsets.lengthData, encodedGd3Tags.length, true);
    dataView.setUint32(VGM_OFFSETS.EOF_OFFSET, vgmData.gd3Offsets.tagsData + encodedGd3Tags.length - VGM_OFFSETS.EOF_OFFSET, true);

    //Set gd3tags data replacing the old ones
    const vgmFileDataTrim = new Uint8Array(vgmFileData, 0, vgmData.gd3Offsets.tagsData);
    const vgmFileDataUpdated = new Uint8Array(vgmFileDataTrim.length + encodedGd3Tags.length);
    vgmFileDataUpdated.set(vgmFileDataTrim, 0);
    vgmFileDataUpdated.set(encodedGd3Tags, vgmFileDataTrim.length);

    //Donwload modified VGM file
    downloadVGMFile(vgmFileDataUpdated.buffer, vgmFileName);
}