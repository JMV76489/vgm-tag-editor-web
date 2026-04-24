export type vgmErrorName =
    'VGM_BAD_IDENT_ERROR' |
    'VGM_READ_IDENT_ERROR' |
    'VGM_GD3_OFFSET_READ_ERROR' |
    'VGM_NO_GD3_TAGS_ERROR' |
    'VGM_BAD_GD3_IDENT_ERROR' |
    'VGM_GD3_IDENT_READ_ERROR' |
    'VGM_GD3_TAGS_READ_ERROR';

export class VGMError extends Error {
    name: vgmErrorName;
    message: string;
    userMessage: string;
    externalCause?: unknown;
    
    constructor(name: vgmErrorName, message: string, userMessage: string, externalCause?: unknown ) {
        super();
        this.name = name;
        this.message = message;
        this.userMessage = userMessage;
        this.externalCause = externalCause;
    }
}