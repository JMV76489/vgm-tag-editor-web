import { useVGMForm } from '../../../hooks/useVGMForm';
import './TagEditorFileSelect.css'

export const TagEditorFileSelect = () => {

    const { onChangeInputFileHandler } = useVGMForm();

    return (
        <div className="tag-editor__section tag-editor__section--file-select">
            <div className="tag-editor__section-container">
                <div className="tag-editor__field-section tag-editor__field-section--file-select">
                    <h2>Load a VGM file</h2>
                    <input type="file" onChange={onChangeInputFileHandler} accept=".vgm,.vgz" />
                </div>
            </div>
        </div>
    )
}