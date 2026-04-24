import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import type { VGMGD3Tags } from "../interfaces/VGMGd3Tags";
import { VGMContext } from "../context/useVGMContext";
import { VGMError } from "../errors/VGMError.error";
import { loadVGMFileAction } from "../actions/load-vgm-file.action";
import { loadVGMTagsAction } from "../actions/load-vgm-tags.action";
import { decompressGzip } from "../utils/decompress-gzip";
import { isVGMCompressed } from "../utils/is-vgm-compressed";
import { downloadVGMFileAction } from "../actions/download-vgm-file.action";
import { editVGMFileAction } from "../actions/edit-vgm-file.action";
import { compressGzip } from "../utils/compress-gzip";
import { EMPTY_GD3_TAGS } from "../constants/gd3-constants";
import { TOAST_ERROR_OPTIONS, TOAST_WARNING_OPTIONS } from "../constants/toast-styles-constants";

export const tagEditorInputsName = {
    vgmCreator: "vgm-creator",
    releaseDate: "release-date",
    notes: "notes",
    tagsEnglish: {
        trackName: "track-name-english",
        gameName: "game-name-english",
        systemName: "system-name-english",
        authorName: "author-name-english"
    },
    tagsNonEnglish: {
        trackName: "track-name-non-english",
        gameName: "game-name-non-english",
        systemName: "system-name-non-english",
        authorName: "author-name-non-english"
    },
    doDownloadAsVgz: "download-as-vgz"
}

export const useVGMForm = () => {

    const { clearAllVGMData, setVGMTags, vgmFile, vgmFileData, vgmTags } = useContext(VGMContext);

    const formRefs = {
        vgmCreator: useRef<HTMLInputElement>(null),
        releaseDate: useRef<HTMLInputElement>(null),
        notes: useRef<HTMLTextAreaElement>(null),
        tagsEnglish: {
            trackName: useRef<HTMLInputElement>(null),
            authorName: useRef<HTMLInputElement>(null),
            gameName: useRef<HTMLInputElement>(null),
            systemName: useRef<HTMLInputElement>(null),
        },
        tagsNonEnglish: {
            trackName: useRef<HTMLInputElement>(null),
            authorName: useRef<HTMLInputElement>(null),
            gameName: useRef<HTMLInputElement>(null),
            systemName: useRef<HTMLInputElement>(null),
        },
    }

    const updateVGMTagsInputs = () => {
        formRefs.vgmCreator.current && (formRefs.vgmCreator.current.value = vgmTags?.vgmCreator ?? '');
        formRefs.releaseDate.current && (formRefs.releaseDate.current.value = vgmTags?.releaseDate ?? '');
        formRefs.notes.current && (formRefs.notes.current.value = vgmTags?.notes ?? '');
        formRefs.tagsEnglish.trackName.current && (formRefs.tagsEnglish.trackName.current.value = vgmTags?.tagsEnglish?.trackName ?? '');
        formRefs.tagsEnglish.authorName.current && (formRefs.tagsEnglish.authorName.current.value = vgmTags?.tagsEnglish?.authorName ?? '');
        formRefs.tagsEnglish.gameName.current && (formRefs.tagsEnglish.gameName.current.value = vgmTags?.tagsEnglish?.gameName ?? '');
        formRefs.tagsEnglish.systemName.current && (formRefs.tagsEnglish.systemName.current.value = vgmTags?.tagsEnglish?.systemName ?? '');
        formRefs.tagsNonEnglish.trackName.current && (formRefs.tagsNonEnglish.trackName.current.value = vgmTags?.tagsNonEnglish?.trackName ?? '');
        formRefs.tagsNonEnglish.authorName.current && (formRefs.tagsNonEnglish.authorName.current.value = vgmTags?.tagsNonEnglish?.authorName ?? '');
        formRefs.tagsNonEnglish.gameName.current && (formRefs.tagsNonEnglish.gameName.current.value = vgmTags?.tagsNonEnglish?.gameName ?? '');
        formRefs.tagsNonEnglish.systemName.current && (formRefs.tagsNonEnglish.systemName.current.value = vgmTags?.tagsNonEnglish?.systemName ?? '');
    }


    const onChangeInputFileHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        clearAllVGMData();

        const files = event.target.files;

        if (files) {
            const curVGMFile = files[0];
            let loadedVGMFileData: Uint8Array<ArrayBuffer> | undefined;
            let isLoadedVGMFileCompressed: Boolean | undefined;

            try {
                loadedVGMFileData = await loadVGMFileAction(curVGMFile);
                isLoadedVGMFileCompressed = isVGMCompressed(loadedVGMFileData);
            } catch (error) {
                toast.error("Problems reading and checking VGM File.", TOAST_ERROR_OPTIONS);
                return;
            }

            try {
                if (isLoadedVGMFileCompressed) {
                    loadedVGMFileData = await decompressGzip(loadedVGMFileData);
                }
            }
            catch (error) {
                toast.error("VGM File couldn't be decompressed. File may be corrupted", TOAST_ERROR_OPTIONS);
                return;
            }

            let loadedVGMTags = { ...EMPTY_GD3_TAGS };
            try {
                loadedVGMTags = await loadVGMTagsAction(loadedVGMFileData);
            } catch (error) {
                if (error instanceof VGMError) {
                    if (error.name != 'VGM_NO_GD3_TAGS_ERROR') {
                        toast.error(error.userMessage, TOAST_ERROR_OPTIONS);
                        return;
                    }
                    toast.warning(error.userMessage, TOAST_WARNING_OPTIONS);
                }
            }
            setVGMTags(loadedVGMTags);
            vgmFile.current = curVGMFile;
            vgmFileData.current = loadedVGMFileData;
        }
    }

    const onBlurHandlerInputText = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.value = e.target.value.trim();
    }

    const onSubmitFormHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (!vgmTags || !vgmFile?.current || !vgmFileData?.current) {
            return;
        }

        const updatedVGMTags: VGMGD3Tags = {
            ...vgmTags,
            releaseDate: formData.get(tagEditorInputsName.releaseDate)?.toString() || '',
            vgmCreator: formData.get(tagEditorInputsName.vgmCreator)?.toString() || '',
            notes: formData.get(tagEditorInputsName.notes)?.toString() || '',
            tagsEnglish: {
                trackName: formData.get(tagEditorInputsName.tagsEnglish.trackName)?.toString() || '',
                gameName: formData.get(tagEditorInputsName.tagsEnglish.gameName)?.toString() || '',
                systemName: formData.get(tagEditorInputsName.tagsEnglish.systemName)?.toString() || '',
                authorName: formData.get(tagEditorInputsName.tagsEnglish.authorName)?.toString() || '',
            },
            tagsNonEnglish: {
                trackName: formData.get(tagEditorInputsName.tagsNonEnglish.trackName)?.toString() || '',
                gameName: formData.get(tagEditorInputsName.tagsNonEnglish.gameName)?.toString() || '',
                systemName: formData.get(tagEditorInputsName.tagsNonEnglish.systemName)?.toString() || '',
                authorName: formData.get(tagEditorInputsName.tagsNonEnglish.authorName)?.toString() || '',
            }
        }

        let updatedVGMFileData = editVGMFileAction(vgmFileData.current!, updatedVGMTags);

        const doDownloadAsVgz = formData.get(tagEditorInputsName.doDownloadAsVgz);

        if (doDownloadAsVgz) {
            try {
                updatedVGMFileData = await compressGzip(updatedVGMFileData);
            } catch (e) {
                console.error(e);
                return;
            }
        }

        const fileName = vgmFile.current!.name;
        const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));

        downloadVGMFileAction(updatedVGMFileData, `${fileNameWithoutExtension}.${doDownloadAsVgz ? 'vgz' : 'vgm'}`);
    }

    return {
        formRefs,
        onChangeInputFileHandler,
        onBlurHandlerInputText,
        onSubmitFormHandler,
        updateVGMTagsInputs,
    }
}