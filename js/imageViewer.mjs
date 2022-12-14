function ImageViewer() {
    const dialog = document.getElementById("imageViewer");
    const imageWindow = document.getElementsByClassName("image-window")[0];
    const closeBtn = dialog.getElementsByClassName("close-btn")[0];
    closeBtn.addEventListener("click", () => {
        closeBtn.parentElement.close();
    });

    document.getElementById("leftArrow").addEventListener("click", () => {
        const idxOfLast = this.imagePaths.length - 1;
        const newIdx = this.currentIdx !== 0 ? this.currentIdx - 1 : idxOfLast;
        updateImage(newIdx);
    });
    document.getElementById("rightArrow").addEventListener("click", () => {
        const idxOfLast = this.imagePaths.length - 1;
        const newIdx = this.currentIdx !== idxOfLast ? this.currentIdx + 1 : 0;
        updateImage(newIdx);
    });

    /**
     * 
     * @param {string[]} imagePaths - Массив с путями к изображениям.
     * @param {number} idx - ИД, текущего изображения для показа в ImageViever.
     */
    const open = (imagePaths, idx) => {
        this.imagePaths = imagePaths;
        updateImage(idx);
        dialog.showModal();
    }

    /**
     * Устанавливаем изображение по индексу.
     * @param {number} idx 
     */
    const updateImage = (idx) => {
        this.currentIdx = idx;
        imageWindow.setAttribute("src", this.imagePaths[this.currentIdx]);
    }

    return {
        open: open
    }
}
export default ImageViewer;