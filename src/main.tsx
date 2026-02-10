import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VGMTagEditorApp from './VGMTagEditorApp.tsx'

import './index.css'
import 'normalize.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VGMTagEditorApp />
  </StrictMode>,
)