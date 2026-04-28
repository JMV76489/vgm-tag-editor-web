import { useContext, useEffect } from "react";
import { VGMContext } from "../../../context/useVGMContext";
import { useVGMForm, tagEditorInputsName } from "../../../hooks/useVGMForm";
import './TagEditorGD3Tags.css'

export const TagEditorGD3Tags = () => {
    const { vgmTags } = useContext(VGMContext);
    const { formRefs, onBlurHandlerInputText, updateVGMTagsInputs } = useVGMForm();

    useEffect(() => {
        updateVGMTagsInputs();
    }, [vgmTags])

    return (
        <div className="tag-editor__section tag-editor__section--gd3">
            <div className="tag-editor__section-container">
                <div className="tag-editor__field-section tag-editor__field-section--general">
                    <div className="tag-editor__field tag-editor__field--input">
                        <label className="field__label">VGM Creator: </label>
                        <input ref={formRefs.vgmCreator} className="field__input" name={tagEditorInputsName.vgmCreator} onBlur={onBlurHandlerInputText}></input>
                    </div>
                    <div className="tag-editor__field tag-editor__field--input">
                        <label className="field__label">Releases date: </label>
                        <input ref={formRefs.releaseDate} className="field__input" name={tagEditorInputsName.releaseDate} onBlur={onBlurHandlerInputText}></input>
                    </div>
                    <div className="tag-editor__field tag-editor__field--span">
                        <div className="tag-editor__field--input">
                            <label className="field__label">Notes: </label>
                            <textarea ref={formRefs.notes} className="field__text-area" name={tagEditorInputsName.notes} cols={16} rows={8} onBlur={onBlurHandlerInputText}></textarea>
                        </div>
                    </div>
                </div>
                <div className="tag-editor__field-section tag-editor__field-section--bilingual">
                    <div className="tag-editor__language-section">
                        <h3>English</h3>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">Title: </label>
                            <input ref={formRefs.tagsEnglish.trackName} className="field__input" name={tagEditorInputsName.tagsEnglish.trackName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">Author: </label>
                            <input ref={formRefs.tagsEnglish.authorName} className="field__input" name={tagEditorInputsName.tagsEnglish.authorName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">Game: </label>
                            <input ref={formRefs.tagsEnglish.gameName} className="field__input" name={tagEditorInputsName.tagsEnglish.gameName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">System: </label>
                            <input ref={formRefs.tagsEnglish.systemName} className="field__input" name={tagEditorInputsName.tagsEnglish.systemName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                    </div>
                    <div className="tag-editor__language-section">
                        <h3>Non-english</h3>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">Title:</label>
                            <input ref={formRefs.tagsNonEnglish.trackName} className="field__input" name={tagEditorInputsName.tagsNonEnglish.trackName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">Author: </label>
                            <input ref={formRefs.tagsNonEnglish.authorName} className="field__input" name={tagEditorInputsName.tagsNonEnglish.authorName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">Game: </label>
                            <input ref={formRefs.tagsNonEnglish.gameName} className="field__input" name={tagEditorInputsName.tagsNonEnglish.gameName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                        <div className="tag-editor__field tag-editor__field--input">
                            <label className="field__label">System: </label>
                            <input ref={formRefs.tagsNonEnglish.systemName} className="field__input" name={tagEditorInputsName.tagsNonEnglish.systemName} onBlur={onBlurHandlerInputText}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
