export const downloadVGMFile = (vgmFileData: ArrayBuffer, vgmFileName: string) => {
    const vgmFileBlob = new Blob([vgmFileData], {
        type: "application/octet-stream",
    });

    const url = URL.createObjectURL(vgmFileBlob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', vgmFileName);
    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link)
    URL.revokeObjectURL(url);
}