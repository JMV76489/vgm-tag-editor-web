import { useVGMForm } from "../../hooks/useVGMForm";
import { TagEditorFileSelect } from "./fileSelect/TagEditorFileSelect";
import { TagEditorGD3Tags } from "./gd3Tags/TagEditorGD3Tags";
import { TagEditorSaveOptions } from "./saveOptions/TagEditorSaveOptions";
import './TagEditor.css'

export const TagEditor = () => {

    const { onSubmitFormHandler } = useVGMForm();

    return (
        <div className="tag-editor">
            <form onSubmit={onSubmitFormHandler}>
                <TagEditorFileSelect />
                <TagEditorGD3Tags />
                <TagEditorSaveOptions />
            </form>
        </div>
    )
}