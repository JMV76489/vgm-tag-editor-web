import type { GD3Data, GD3DataOffsets } from "./gd3-data";

export interface VGMData {
    headerIdent: string;
    eofOffset: number;
    versionInteger: number;
    versionDecimal: number;
    gd3Offset: number;
    totalSamples: number;
    loopOffset: number;
    loopSamples: number;
    rate: number;
    vgmDataOffset: number;
    gd3Ident: string;
    gd3Offsets: GD3DataOffsets;
    gd3Data: GD3Data;
}