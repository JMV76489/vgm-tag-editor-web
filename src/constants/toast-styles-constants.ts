import { Slide, type ToastOptions } from "react-toastify";

const TOAST_EXCEPTION_STYLE: React.CSSProperties = {
    backgroundColor: '#3d3d3d',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    padding: '1.5em'
}

export const TOAST_ERROR_OPTIONS: ToastOptions = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
    style: TOAST_EXCEPTION_STYLE
}

export const TOAST_WARNING_OPTIONS: ToastOptions = {
    position: "top-right",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: true,
    transition: Slide,
    style: TOAST_EXCEPTION_STYLE
}