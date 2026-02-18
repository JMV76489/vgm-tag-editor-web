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

    const isVGMDataLoaded = vgmData != undefined;

    return (
        <div className='viewer'>
            <div className='viewer__file-selector'>
                <h2>Select VGM file</h2>
                <input className='input_file' type='file' onChange={handleFileChange} accept='.vgm, .vgz' />
            </div>
            <div className='viewer__section'>
                <h3>HEADER</h3>
                <div className='viewer__field-section'>
                    <div className='viewer__field'>
                        <label className='label-bold'>Track length</label>
                        <label>{vgmData?.totalSamples && `${vgmData.totalSamples} samples`}</label>
                    </div>
                    <div className='viewer__field'>
                        <label className='label-bold'>Loop Start</label>
                        <label>{vgmData?.loopOffset && `${vgmData.loopOffset} samples`}</label>
                    </div>
                    <div className='viewer__field'>
                        <label className='label-bold'>Loop end</label>
                        <label>{vgmData?.loopSamples && `${vgmData.loopSamples} samples`}</label>
                    </div>
                    <div className='viewer__field'>
                        <label className='label-bold' htmlFor='rate'>Rate</label>
                        <div className='viewer__field_suffix'>
                            <input
                                type='number'
                                name='rate'
                                value={isVGMDataLoaded ? vgmData.rate : ""}
                                min={0}
                                max={INPUT_NUMBER_MAX_VALUE.UINT_32}
                                onChange={event => inputNumberOnChangeHandler(event, 'rate')}
                                onKeyDown={inputNumberOnKeyDownHandler}
                                disabled={!isVGMDataLoaded}
                            />
                            <span>Hz</span>
                        </div>

                        
                    </div>
                    <div className='viewer__field'>
                        <label className='label-bold' htmlFor='rate'>Version</label>
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
                            <span>.</span>
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
            </div>
            <div className='viewer__section'>
                <h3>GD3 TAGS</h3>
                <div className='viewer__bilingual'>
                    <div className='viewer__idiom-section'>
                        <h4>English</h4>
                        <div className='viewer__field'>
                            <label className='label-bold' htmlFor='track-name-english'>Track Name</label>
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
                            <label className='label-bold' htmlFor='author-english'>Author</label>
                            <input
                                type='text'
                                name='author-english'
                                value={vgmData?.gd3Data.originalAuthorEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'originalAuthorEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label className='label-bold' htmlFor='game-name-english'>Game</label>
                            <input
                                type='text'
                                name='game-name-english'
                                value={vgmData?.gd3Data.gameNameEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'gameNameEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label className='label-bold' htmlFor='system-name-english'>System</label>
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
                    <div className='viewer__idiom-section'>
                        <h4>Non english</h4>
                        <div className='viewer__field'>
                            <label className='label-bold' htmlFor='track-name-non-english'>Track Name</label>
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
                            <label className='label-bold' htmlFor='author-non-english'>Author</label>
                            <input
                                type='text'
                                name='author-non-english'
                                value={vgmData?.gd3Data.originalAuthorNonEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'originalAuthorNonEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label className='label-bold' htmlFor='game-name-non-english'>Game</label>
                            <input
                                type='text'
                                name='game-name-non-english'
                                value={vgmData?.gd3Data.gameNameNonEnglish || ''}
                                onChange={event => inputTagOnChangeHandler(event, 'gameNameNonEnglish')}
                                onKeyDown={inputTagOnKeyDownHandler}
                                onBlur={inputOnBlurHandler}
                                disabled={!isVGMDataLoaded}
                            />
                        </div>
                        <div className='viewer__field'>
                            <label className='label-bold' htmlFor='system-name-non-english'>System</label>
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
                <div className='viewer__field-section'>
                    <div className='viewer__field viewer__field_misc'>
                        <label className='label-bold'>Release date</label>
                        <input
                            type='text'
                            value={vgmData?.gd3Data.gameReleaseDate || ''}
                            onChange={event => inputTagOnChangeHandler(event, 'gameReleaseDate')}
                            onKeyDown={inputTagOnKeyDownHandler}
                            onBlur={inputOnBlurHandler}
                            disabled={!isVGMDataLoaded}
                        />
                    </div>
                    <div className='viewer__field viewer__field_misc'>
                        <label className='label-bold'>VGM Creator</label>
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
                    <div className='viewer__field viewer__field_text-area'>
                        <label className='label-bold'>Notes</label>
                        <textarea
                            value={vgmData?.gd3Data.notes || ''}
                            onChange={event => inputTagOnChangeHandler(event, 'notes')}
                            onBlur={inputOnBlurHandler}
                            disabled={!isVGMDataLoaded}
                        />
                    </div>
                </div>
            </div>
            <div className='viewer__buttons-actions'>
                <button
                    onClick={() => {
                        if (vgmData && vgmFileData) {
                            saveVGMData(vgmData, vgmFileData, vgmfileName);
                        }
                    }}
                    disabled={!isVGMDataLoaded}
                >
                    Save
                </button>
            </div>
        </div>
    )
}