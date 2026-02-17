import './VGMDataViewer.css'
import { useVGMData } from '../../hooks/useVGMData';
import { INPUT_NUMBER_MAX_VALUE } from '../../constants/input-number-range';
import { saveVGMData } from '../../actions/save-vgm-data.action';

export const VGMDataViewer: React.FC = () => {

    const {
        handleFileChange,
        vgmData,
        vgmFileData,
        vgmfileName,
        inputNumberOnChangeHandler,
        inputTagOnChangeHandler,
        inputOnBlurHandler,
        inputNumberOnKeyDownHandler,
        inputTagOnKeyDownHandler
    } = useVGMData();

    const isVGMDataLoaded = vgmData!= undefined;

    return (
        <div className='viewer'>
            <div className='viewer__section'>
                <h2>Load a VGM file</h2>
                <input type='file' onChange={handleFileChange} accept='.vgm, .vgz' />
            </div>
            <div className='viewer__section'>
                <h2 className='header'>Header: </h2>
                <div>
                    <label>Track length: {vgmData?.totalSamples && `${vgmData.totalSamples} samples`}</label>
                </div>
                <div>
                    <label>Loop start: {vgmData?.loopOffset && `${vgmData.loopOffset} samples`}</label>
                </div>
                <div>
                    <label>Loop end: {vgmData?.loopSamples && `${vgmData.loopSamples} samples`}</label>
                </div>
                <div className='viewer__field'>
                    <label htmlFor='rate'>Playback rate: </label>
                    <input
                        type='number'
                        name='rate'
                        value={isVGMDataLoaded? vgmData.rate : ""}
                        min={0}
                        max={INPUT_NUMBER_MAX_VALUE.UINT_32}
                        onChange={event => inputNumberOnChangeHandler(event, 'rate')}
                        onKeyDown={inputNumberOnKeyDownHandler}
                        disabled={!isVGMDataLoaded}
                    />
                </div>
                <div className='viewer__field viewer__field_version'>
                    <label htmlFor='version-integer'>Version: </label>
                    <div>
                        <input
                            type='number'
                            name='version-integer'
                            value={isVGMDataLoaded ? vgmData.versionInteger : ""}
                            min={0}
                            max={INPUT_NUMBER_MAX_VALUE.VERSION_INTEGER}
                            onChange={event => inputNumberOnChangeHandler(event, 'versionInteger')}
                            onKeyDown={inputNumberOnKeyDownHandler}
                            disabled={!isVGMDataLoaded}
                        />
                    </div>
                    <span>.</span>
                    <div className='viewer__field'>
                        <input
                            type='number'
                            name='version-decimal'
                            value={isVGMDataLoaded ? vgmData.versionDecimal : ""}
                            min={0}
                            max={INPUT_NUMBER_MAX_VALUE.VERSION_DECIMAL}
                            onChange={event => inputNumberOnChangeHandler(event, 'versionDecimal')}
                            onKeyDown={inputNumberOnKeyDownHandler}
                            disabled={!isVGMDataLoaded}
                        />
                    </div>
                </div>
            </div>
            <div className='viewer__section'>
                <h2>GD3 Tags: </h2>
                <div>
                    <label>GD3 Version: {vgmData?.gd3Data.version}</label>
                </div>
                <div className='viewer__field viewer__field-bilingual'>
                    <div className='viewer__section'>
                        <h3>English</h3>
                        <div className='viewer__field'>
                            <label>Track Name: </label>
                            <input
                                type='text'
                                name='track-name-english'
                                value={vgmData?.gd3Data.trackNameEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'trackNameEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label>Author: </label>
                            <input
                                type='text'
                                name='author-name-english'
                                value={vgmData?.gd3Data.originalAuthorEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'originalAuthorEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label>System: </label>
                            <input
                                type='text'
                                name='system-name-english'
                                value={vgmData?.gd3Data.systemNameEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'systemNameEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                    </div>
                    <div className='viewer__section'>
                        <h3>Non english</h3>
                        <div className='viewer__field'>
                            <label>Track Name: </label>
                            <input
                                type='text'
                                name='track-name-non-english'
                                value={vgmData?.gd3Data.trackNameNonEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'trackNameNonEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label>Author: </label>
                            <input
                                type='text'
                                name='author-name-non-english'
                                value={vgmData?.gd3Data.originalAuthorNonEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'originalAuthorNonEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label>System: </label>
                            <input
                                type='text'
                                name='system-name-non-english'
                                value={vgmData?.gd3Data.systemNameNonEnglish || ''}  
                                onChange={event => inputTagOnChangeHandler(event, 'systemNameNonEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                    </div>
                </div>
                <div className='viewer__field'>
                    <label>Release date: </label>
                    <input
                        type='text'
                        value={vgmData?.gd3Data.gameReleaseDate || ''}
                        onChange={event => inputTagOnChangeHandler(event, 'gameReleaseDate')}
                        onKeyDown={inputTagOnKeyDownHandler}
                        onBlur={inputOnBlurHandler}
                        disabled={!isVGMDataLoaded}
                    />
                </div>
                <div className='viewer__field'>
                    <label>VGM Creator: </label>
                    <input
                        type='text'
                        name='creator'
                        value={vgmData?.gd3Data.vgmCreator || ''}
                        onChange={event => inputTagOnChangeHandler(event, 'vgmCreator')}
                        onKeyDown={inputTagOnKeyDownHandler}
                        onBlur={inputOnBlurHandler}
                        disabled={!isVGMDataLoaded}
                    />
                </div>
                <div className='viewer__field'>
                    <label>Notes: </label>
                    <br />
                    <textarea
                        value={vgmData?.gd3Data.notes || ''}
                        onChange={event => inputTagOnChangeHandler(event, 'notes')}
                        onBlur={inputOnBlurHandler}
                        disabled={!isVGMDataLoaded}
                    />
                </div>
                <div className='viewer__field'>
                    <button
                        onClick={() => {
                            if (vgmData && vgmFileData) {
                                saveVGMData(vgmData, vgmFileData, vgmfileName);
                            }
                        }}
                        disabled={!isVGMDataLoaded}
                    >Save</button>
                </div>
            </div>
        </div>
    )
}