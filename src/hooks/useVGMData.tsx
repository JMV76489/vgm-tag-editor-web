import { useEffect, useState } from "react"
import { readVGMFile } from "../actions/read-vgm-file.action";
import { readVGMData as readVGMData } from "../actions/read-vgm-data.action";
import type { VGMData } from "../interfaces/vgm-data";
import type { GD3Data } from "../interfaces/gd3-data";

export const useVGMData = () => {
    const [vgmfileName, setVGMFileName] = useState("");
    const [vgmFile, setVGMFile] = useState<File>();
    const [vgmFileData, setVGMFileData] = useState<ArrayBuffer>();
    const [vgmData, setVGMData] = useState<VGMData>();
    
    const inputOnBlurHandler = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.target.value = event.target.value.trim();
    }

    const inputTagOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event.key)
        if (event.key === 'Enter') {
            event.currentTarget.value = event.currentTarget.value.trim();
            event.currentTarget.blur()
        }
    }

    const inputTagOnChangeHandler = <K extends keyof GD3Data>(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: K) => {
        if (vgmData) {
            setVGMData({
                ...vgmData,
                gd3Data: {
                    ...vgmData.gd3Data,
                    [key]: event.target.value,
                }
            })
        }
    }

    const inputNumberOnKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (Number.isNaN(Number(event.key))) {
            event.preventDefault();
        }
    }

    const inputNumberOnChangeHandler = <K extends keyof VGMData>(event: React.ChangeEvent<HTMLInputElement>, key: K) => {
        let value = Number(event.target.value);
        const inputMaxValue = Number(event.target.getAttribute("max"));
        const inputMinValue = Number(event.target.getAttribute("min"));

        if (Number.isNaN(value)) value = 0;

        if (value > inputMaxValue) {
            value = inputMaxValue;
        } else if (value < inputMinValue) {
            value = inputMinValue;
        }

        event.target.value = `${value}`

        if (vgmData) {
            setVGMData({
                ...vgmData,
                [key]: value
            })
        }
    }

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
            setVGMFileName(file.name);
        } else {
            console.log("File reading error");
        }
    }

    return {
        vgmData,
        vgmFileData,
        vgmfileName,
        setVGMData,
        handleFileChange,
        inputNumberOnChangeHandler,
        inputTagOnChangeHandler,
        inputOnBlurHandler,
        inputNumberOnKeyDownHandler,
        inputTagOnKeyDownHandler
    }
}