import { VGMContextProvider } from "./context/useVGMContext"
import { ToastContainer } from 'react-toastify';
import { Banner } from "./components/banner/Banner";
import { TagEditor } from "./components/tagEditor/TagEditor";

const VGMTagEditorApp = () => {
  return (
    <>
      <VGMContextProvider>
        <ToastContainer/>
        <Banner />
        <TagEditor />
      </VGMContextProvider>
    </>
  )
}

export default VGMTagEditorApp