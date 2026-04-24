import { useContext } from "react";
import { VGMContext } from "../../../context/useVGMContext";
import { tagEditorInputsName } from "../../../hooks/useVGMForm";
import './TagEditorSaveOptions.css'

export const TagEditorSaveOptions = () => {

  const { vgmTags, vgmFileData, vgmFile } = useContext(VGMContext);
  const isVGMLoaded = vgmTags && vgmFile.current && vgmFileData.current;

  return (
    <div className="tag-editor__section tag-editor__section--save-options">
      <div className="tag-editor__section-container">
        <div className="tag-editor__field-section tag-editor__field-section--save-options">
          <div className="tag-editor__field tag-editor__field--checkbox">
            <label>Download as VGM Compressed (VGZ)</label>
            <input type="checkbox" name={tagEditorInputsName.doDownloadAsVgz} />
          </div>
          <div className="tag-editor__field tag-editor__field--button">
            <button disabled={!isVGMLoaded}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
