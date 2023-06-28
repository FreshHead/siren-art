class Folder extends HTMLElement {
    connectedCallback() {
        const folderSrc = this.getAttribute("src");
        this.classList.add("folder");

        // Карточка папка.
        const card = document.createElement("figure");
        card.innerHTML = `
            <img src="${folderSrc}/0.jpg"/>
            <figcaption>${this.getAttribute("caption")}</figcaption>
        `;
        card.addEventListener("click", () => {
            folderDialog.showModal();
        });
        this.appendChild(card);

        // Диалог с изображениями внутри папки.
        const folderDialog = document.createElement("dialog");
        folderDialog.classList.add("folder-dialog");

        const closeBtn = document.createElement("div");
        closeBtn.classList.add("close-btn");
        closeBtn.addEventListener("click", () => {
            folderDialog.close();
        });
        folderDialog.appendChild(closeBtn);

        for (let i = 0; i < this.getAttribute("imgCount"); i++) {
            const subCard = document.createElement("figure");
            subCard.innerHTML = `<img src = "${folderSrc}/${i}.jpg"/>`
            folderDialog.appendChild(subCard);
        }

        this.appendChild(folderDialog);
    }

}

export default Folder;