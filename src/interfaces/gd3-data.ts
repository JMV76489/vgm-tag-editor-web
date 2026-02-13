export interface GD3DataOffsets {
    version: number,
    lengthData: number,
    tagsData: number,
}

export interface GD3Data {
    tagsLength: number;
    version: number;
    trackNameEnglish: string;
    trackNameNonEnglish: string;
    gameNameEnglish: string;
    gameNameNonEnglish: string;
    systemNameEnglish: string;
    systemNameNonEnglish: string;
    originalAuthorEnglish: string;
    originalAuthorNonEnglish: string;
    gameReleaseDate: string;
    vgmCreator: string;
    notes: string;
}