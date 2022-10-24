class GalleryCard extends HTMLElement {
    /**
     * Имеет атрибуты:
     * title - Заголовок карточки
     * imageName - Имя изображения карточки. Используется gallery-grid для вычисления полного пути src.
     * src - Полный путь до изображения карточки.
     */
    connectedCallback() {
        this.getAttribute("title");
        this.getAttribute("imageName");
        this.getAttribute("src");
    }
}

export default GalleryCard;