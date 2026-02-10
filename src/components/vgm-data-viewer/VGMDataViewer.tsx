import './VGMDataViewer.css'
import { useVGMData } from "../../hooks/useVGMData";
import { INPUT_NUMBER_MAX_VALUE } from '../../constants/input-number-range';

export const VGMDataViewer: React.FC = () => {

    const {
        handleFileChange,
        vgmData,
        inputNumberOnChangeHandler,
        inputTagOnChangeHandler,
        inputOnBlurHandler,
        inputNumberOnKeyDownHandler,
        inputTagOnKeyDownHandler
    } = useVGMData();

    return (
        <div className="vgm-data-ui">
            <div className='file-selector'>
                <h2>Load a VGM file</h2>
                <input type='file' onChange={handleFileChange} accept='.vgm, .vgz' />
            </div>
            <div className="vgm-data-ui-header">
                <h2>Header: </h2>
                <div className="vgm-data-ui__label">
                    <label>Track length: {vgmData?.totalSamples && `${vgmData.totalSamples} samples`}</label>
                </div>
                <div className="vgm-data-ui__label">
                    <label>Loop start: {vgmData?.loopOffset && `${vgmData.loopOffset} samples`}</label>
                </div>
                <div className="vgm-data-ui__label">
                    <label>Loop end: {vgmData?.loopSamples && `${vgmData.loopSamples} samples`}</label>
                </div>
                <div className="vgm-data-ui__input">
                    <label htmlFor="rate">Playback rate: </label>
                    <input
                        type="number"
                        name='rate'
                        value={vgmData?.rate || ""}
                        min={0}
                        max={INPUT_NUMBER_MAX_VALUE.UINT_32}
                        onChange={event => inputNumberOnChangeHandler(event, "rate")}
                        onKeyDown={inputNumberOnKeyDownHandler}
                    />
                </div>
                <div className="vgm-data-ui-version">
                    <label htmlFor='version-integer'>Version: </label>
                    <div className="vgm-data-ui__input">
                        <input
                            type="number"
                            name='version-integer'
                            value={vgmData?.versionInteger || ""}
                            min={0}
                            max={INPUT_NUMBER_MAX_VALUE.VERSION_INTEGER}
                            onChange={event => inputNumberOnChangeHandler(event, "versionInteger")}
                            onKeyDown={inputNumberOnKeyDownHandler}
                        />
                    </div>
                    <span>.</span>
                    <div className="vgm-data-ui__input">
                        <input
                            type="number"
                            name='version-decimal'
                            value={vgmData?.versionDecimal || ""}
                            min={0}
                            max={INPUT_NUMBER_MAX_VALUE.VERSION_DECIMAL}
                            onChange={event => inputNumberOnChangeHandler(event, "versionDecimal")}
                            onKeyDown={inputNumberOnKeyDownHandler}
                        />
                    </div>
                </div>
            </div>
            <div className="vgm-data-ui-gd3-data">
                <h2>GD3 Tags: </h2>
                <div className="vgm-data-ui__label">
                    <label>GD3 Version: {vgmData?.gd3Data.version}</label>
                </div>
                <div className="gd3-data-bilingual">
                    <div className="gd3-data-bilingual-english">
                        <h3>English</h3>
                        <div className="vgm-data-ui__input">
                            <label>Track Name: </label>
                            <input
                                type="text"
                                name='track-name-english'
                                value={vgmData?.gd3Data.trackNameEnglish || ""}
                                onChange={event => inputTagOnChangeHandler(event, "trackNameEnglish")}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                            />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>Author: </label>
                            <input
                                type="text"
                                name='author-name-english'
                                value={vgmData?.gd3Data.originalAuthorEnglish || ""}
                                onChange={event => inputTagOnChangeHandler(event, "originalAuthorEnglish")}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                            />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>System: </label>
                            <input
                                type="text"
                                name='system-name-english'
                                value={vgmData?.gd3Data.systemNameEnglish || ""}
                                onChange={event => inputTagOnChangeHandler(event, "systemNameEnglish")}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                            />
                        </div>
                    </div>
                    <div className="gd3-data-bilingual-non-english">
                        <h3>Non english</h3>
                        <div className="vgm-data-ui__input">
                            <label>Track Name: </label>
                            <input
                                type="text"
                                name='track-name-non-english'
                                value={vgmData?.gd3Data.trackNameNonEnglish || ""}
                                onChange={event => inputTagOnChangeHandler(event, "trackNameNonEnglish")}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                            />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>Author: </label>
                            <input
                                type="text"
                                name='author-name-non-english'
                                value={vgmData?.gd3Data.originalAuthorNonEnglish || ""}
                                onChange={event => inputTagOnChangeHandler(event, "originalAuthorNonEnglish")}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                            />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>System: </label>
                            <input
                                type="text"
                                name='system-name-non-english'
                                value={vgmData?.gd3Data.systemNameNonEnglish || ""}
                                onChange={event => inputTagOnChangeHandler(event, "systemNameNonEnglish")}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                            />
                        </div>
                    </div>
                </div>
                <div className="vgm-data-ui__input">
                    <label>Release date: </label>
                    <input
                        type="text"
                        value={vgmData?.gd3Data.gameReleaseDate || ""}
                        onChange={event => inputTagOnChangeHandler(event, "vgmCreator")}
                        onKeyDown={inputTagOnKeyDownHandler}
                        onBlur={inputOnBlurHandler}
                    />
                </div>
                <div className="vgm-data-ui__input">
                    <label>VGM Creator: </label>
                    <input
                        type="text"
                        name='creator'
                        value={vgmData?.gd3Data.vgmCreator || ""}
                        onChange={event => inputTagOnChangeHandler(event, "vgmCreator")}
                        onKeyDown={inputTagOnKeyDownHandler}
                        onBlur={inputOnBlurHandler}
                    />
                </div>
                <div className="vgm-data-ui__text-area">
                    <label>Notes: </label>
                    <br />
                    <textarea
                        value={vgmData?.gd3Data.notes || ""}
                        onChange={event => inputTagOnChangeHandler(event, "notes")}
                        onBlur={inputOnBlurHandler}
                    />
                </div>
            </div>
        </div>
    )
}