import type { VGMGD3Tags } from "../interfaces/VGMGd3Tags";

export const GD3_RELATIVE_OFFSETS = {
    GD3_VERSION: 0x04,
    GD3_TAGS_LENGTH: 0x08,
    GD3_TAGS: 0x0c
}

export const GD3_HEADERS_LENGTH = 0x0c

export const GD3_IDENT_UINT32 = 0x47643320;

export const GD3_LATEST_VERSION_UINT32 = 0x0100;

export const EMPTY_GD3_TAGS: VGMGD3Tags = {
    gd3RelativeOffset: 0,
    gd3Version: GD3_LATEST_VERSION_UINT32,
    releaseDate: "",
    vgmCreator: "",
    notes: "",
    tagsEnglish: {
        trackName: "",
        gameName: "",
        systemName: "",
        authorName: ""
    },
    tagsNonEnglish: {
        trackName: "",
        gameName: "",
        systemName: "",
        authorName: ""
    }
}