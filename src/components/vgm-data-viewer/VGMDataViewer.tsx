import './VGMDataViewer.css'
import { useVGMData } from "../../hooks/useVGMData";

export const VGMDataViewer: React.FC = () => {

    const { handleFileChange, vgmData} = useVGMData();

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
                    <input type="number" value={vgmData?.rate}/>
                </div>
                <div className="vgm-data-ui-version">
                    <label>Version: </label>
                    <div className="vgm-data-ui__input">
                        <input type="number" value={vgmData?.versionInteger} />
                    </div>
                    <span>.</span>
                    <div className="vgm-data-ui__input">
                        <input type="number" value={vgmData?.versionDecimal || ""} />
                    </div>
                </div>
            </div>
            <div className="vgm-data-ui-gd3-data">
                <h2>GD3 Tags: </h2>
                <div className="vgm-data-ui__label">
                    <label>GD3 Version: {vgmData?.gd3Data.version || 0}</label>
                </div>
                <div className="gd3-data-bilingual">
                    <div className="gd3-data-bilingual-english">
                        <h3>English</h3>
                        <div className="vgm-data-ui__input">
                            <label>Track Name: </label>
                            <input type="text" value={vgmData?.gd3Data.trackNameEnglish || ""} />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>Author: </label>
                            <input type="text" value={vgmData?.gd3Data.originalAuthorEnglish || ""} />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>System: </label>
                            <input type="text" value={vgmData?.gd3Data.systemNameEnglish || ""} />
                        </div>
                    </div>
                    <div className="gd3-data-bilingual-non-english">
                        <h3>Non english</h3>
                        <div className="vgm-data-ui__input">
                            <label>Track Name: </label>
                            <input type="text" value={vgmData?.gd3Data.trackNameNonEnglish || ""} />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>Author: </label>
                            <input type="text" value={vgmData?.gd3Data.originalAuthorNonEnglish || ""} />
                        </div>
                        <div className="vgm-data-ui__input">
                            <label>System: </label>
                            <input type="text" value={vgmData?.gd3Data.systemNameNonEnglish || ""} />
                        </div>
                    </div>
                </div>
                <div className="vgm-data-ui__input">
                    <label>Release date: </label>
                    <input type="text" value={vgmData?.gd3Data.gameReleaseDate || ""} />
                </div>
                <div className="vgm-data-ui__input">
                    <label>VGM Creator: </label>
                    <input type="text" value={vgmData?.gd3Data.vgmCreator || ""} />
                </div>
                <div className="vgm-data-ui__text-area">
                    <label>Notes: </label>
                    <br />
                    <textarea value={vgmData?.gd3Data.notes || ""} />
                </div>
            </div>
        </div>
    )
}