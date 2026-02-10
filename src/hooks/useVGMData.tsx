import { useEffect, useState } from "react"
import { readVGMFile } from "../actions/read-vgm-file.action";
import { readVGMData as readVGMData } from "../actions/read-vgm-data.action";
import type { VGMData } from "../interfaces/vgm-data";

export const useVGMData = () => {
    const [vgmFile, setVGMFile] = useState<File>();
    const [vgmFileData, setVGMFileData] = useState<ArrayBuffer>();
    const [vgmData, setVGMData] = useState<VGMData>();

    //Handler for reading VGM file
    const handlerReadVGMFile = async () => {
        console.log("Reading VGM File...")
        if (vgmFile) {
            const vgmBufferData = await readVGMFile(vgmFile);
            setVGMFileData(vgmBufferData);
            console.log("VGM file successfully read");
            return;
        }
    }

    //Update VGM data object when the VGM file data loads
    useEffect(() => {
        console.log("Reading and parsing VGM Data...")
        if (vgmFileData) {
            setVGMData(readVGMData(vgmFileData));
            console.log("VGM data successfully read");
        }
    }, [vgmFileData]);

    //Read VGM file when vgm file is loaded an assigned to the state
    useEffect(() => {
        if (vgmFile) {
            handlerReadVGMFile();
        }
    }, [vgmFile])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("File selected");
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setVGMFile(file);
        } else {
            console.log("File reading error");
        }
    }

    return {
        vgmData,
        handleFileChange,
    }
}