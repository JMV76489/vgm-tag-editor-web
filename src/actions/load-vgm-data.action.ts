import { GD3_OFFSETS } from "../constants/gd3-offsets";
import { VGM_OFFSETS } from "../constants/vgm-offsets";
import type { VGMData } from "../interfaces/vgm-data";

export const bcdBufferToNumber = (buffer: Uint8Array) => {
    let result = 0;
    let tenMultiplier = 1;
    for (const byte of buffer) {
        result += ((byte >> 4) * 10 + (byte & 0x0f)) * tenMultiplier;
        tenMultiplier *= 100;
    }
    return result;
}

export const loadVGMData = (vgmDataBuffer: ArrayBuffer): VGMData => {

    //Initialize VGMData to load
    const vgmData: VGMData = {
        headerIdent: "",
        eofOffset: 0,
        versionInteger: 0,
        versionDecimal: 0,
        gd3Offset: 0,
        totalSamples: 0,
        loopOffset: 0,
        loopSamples: 0,
        rate: 0,
        vgmDataOffset: 0,
        gd3Ident: "",
        gd3Offsets: {
            version: 0,
            lengthData: 0,
            tagsData: 0,
        },
        gd3Data: {
            version: 0,
            trackNameEnglish: "",
            trackNameNonEnglish: "",
            gameNameEnglish: "",
            gameNameNonEnglish: "",
            systemNameEnglish: "",
            systemNameNonEnglish: "",
            originalAuthorEnglish: "",
            originalAuthorNonEnglish: "",
            gameReleaseDate: "",
            vgmCreator: "",
            notes: ""
        }
    };

    //Check VGM Ident
    const textDecoderUtf8 = new TextDecoder('utf-8');
    vgmData.headerIdent = textDecoderUtf8.decode(new Uint8Array(vgmDataBuffer, 0, 4));

    console.log("Checking VGM File Header...");
    if (vgmData.headerIdent.trim() !== "Vgm") {
        console.log("Invalid VGM Header");
        return vgmData;
    }
    console.log("Valid VGM File");

    //Load VGM file data with static length
    const dataView = new DataView(vgmDataBuffer);

    vgmData.eofOffset = dataView.getUint32(VGM_OFFSETS.EOF_OFFSET, true);
    vgmData.versionInteger = bcdBufferToNumber(new Uint8Array(vgmDataBuffer, VGM_OFFSETS.VERSION + 0x01, 3));
    vgmData.versionDecimal = bcdBufferToNumber(new Uint8Array(vgmDataBuffer, VGM_OFFSETS.VERSION, 1));
    vgmData.gd3Offset = dataView.getUint32(VGM_OFFSETS.GD3_OFFSET, true);
    vgmData.totalSamples = dataView.getUint32(VGM_OFFSETS.TOTAL_SAMPLES, true);
    vgmData.loopOffset = dataView.getUint32(VGM_OFFSETS.LOOP_OFFSET, true);
    vgmData.loopSamples = dataView.getUint32(VGM_OFFSETS.LOOP_SAMPLES, true);
    vgmData.rate = dataView.getUint32(VGM_OFFSETS.RATE, true);
    vgmData.vgmDataOffset = dataView.getUint32(VGM_OFFSETS.VGM_DATA_OFFSET, true);

    //Check for GD3 tags
    //*TODO Validate the presence of Gd3 Tags to avoid a out of bound reading error
    const gd3StartOffset = vgmData.gd3Offset + VGM_OFFSETS.GD3_OFFSET;
    vgmData.gd3Ident = textDecoderUtf8.decode(new Uint8Array(vgmDataBuffer, gd3StartOffset, 4));

    if (vgmData.gd3Ident.trim() === 'Gd3') {

        //Get the relative GD3 data Offsets  
        vgmData.gd3Offsets = {
            version: gd3StartOffset + GD3_OFFSETS.VERSION,
            lengthData: gd3StartOffset + GD3_OFFSETS.LENGTH_DATA,
            tagsData: gd3StartOffset + GD3_OFFSETS.TAGS_DATA
        };

        vgmData.gd3Data.version = dataView.getUint32(vgmData.gd3Offsets.version, true);

        //Get the GD3 tags and split them by null terminator
        const textDecoderUtf16 = new TextDecoder('utf-16');
        const gd3TagString = textDecoderUtf16.decode(new Uint8Array(vgmDataBuffer, vgmData.gd3Offsets.tagsData));
        const gd3Tags = gd3TagString.split(/\0/);

        const [
            trackNameEnglish, trackNameNonEnglish, gameNameEnglish, gameNameNonEnglish, systemNameEnglish, systemNameNonEnglish, originalAuthorEnglish, originalAuthorNonEnglish, gameReleaseDate, vgmCreator, notes
        ] = gd3Tags;

        vgmData.gd3Data = {
            ...vgmData.gd3Data,
            trackNameEnglish,
            trackNameNonEnglish,
            gameNameEnglish,
            gameNameNonEnglish,
            systemNameEnglish,
            systemNameNonEnglish,
            originalAuthorEnglish,
            originalAuthorNonEnglish,
            gameReleaseDate,
            vgmCreator,
            notes
        };
    }

    console.log(vgmData);
    return vgmData;
};