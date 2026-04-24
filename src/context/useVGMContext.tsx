import { createContext, useRef, useState } from "react";
import type { VGMGD3Tags } from "../interfaces/VGMGd3Tags";

interface VGMContextProps {
    vgmFile: React.RefObject<File | undefined>,
    vgmFileData: React.RefObject<Uint8Array<ArrayBuffer> | undefined>,
    vgmTags: VGMGD3Tags | undefined,
    setVGMTags: React.Dispatch<React.SetStateAction<VGMGD3Tags | undefined>>
    clearAllVGMData: () => void;
}

export const VGMContext = createContext<VGMContextProps>({} as VGMContextProps);

export const VGMContextProvider = ({ children }: React.PropsWithChildren) => {

    const vgmFile = useRef<File>(undefined);
    const vgmFileData = useRef<Uint8Array<ArrayBuffer>>(undefined);
    const [vgmTags, setVGMTags] = useState<VGMGD3Tags>();

    const clearLoadedVGM = () => {
        vgmFile.current = undefined;
        vgmFileData.current = undefined;
        setVGMTags(undefined);
    }

    return (
        <VGMContext.Provider
            value={{
                vgmFile,
                vgmFileData,
                vgmTags,
                setVGMTags,
                clearAllVGMData: clearLoadedVGM,
            }}
        >
            {children}
        </VGMContext.Provider>
    )
}
