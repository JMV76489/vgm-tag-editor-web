import type { BilingualGD3Tags } from "./BilingualGD3Tags";

export interface VGMGD3Tags {
    gd3RelativeOffset: number;
    gd3Version: number;
    releaseDate: string;
    vgmCreator: string;
    notes: string;
    tagsEnglish: BilingualGD3Tags;
    tagsNonEnglish: BilingualGD3Tags;
}