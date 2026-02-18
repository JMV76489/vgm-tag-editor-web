import './VGMTagEditorApp.css'
import { VGMDataViewer } from './components/vgm-data-viewer/VGMDataViewer';

export const VGMTagEditorApp = () => {

  return (
    <div className='app'>
      <div className='banner'>
        <h1>VGM TAG EDITOR</h1>
      </div>
      <VGMDataViewer />
    </div>
  )
}

export default VGMTagEditorApp