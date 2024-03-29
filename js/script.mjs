import Router from "./router.mjs";
import ImageViewer from "./imageViewer.mjs";
import Folder from "./components/Folder.mjs"

const router = new Router();
const imageViewer = new ImageViewer();
customElements.define("card-folder", Folder);

// TODO: Подготовь изображения по соотношения карточек. Как вариант сделать превьюхи отдельно.
router.attachMatched((hash, content) => {
    // Открытие карточек-папок при нажатии.
    // const folderCards = content.getElementsByClassName("folder");
    // for (let i = 0; i < folderCards.length; i++) {
    //     const folderCard = folderCards[i];
    //     const folderDialog = document.getElementById(folderCard.getAttribute("id") + "Dialog");
    //     folderCard.addEventListener("click", () => {
    //         folderDialog.showModal();
    //     });
    //     // Открываем диалог просмотра изображения при нажатии на карточку внутри папки.
    //     const cardsInFolder = folderDialog.getElementsByTagName("figure");

    //     const imagePaths = [];
    //     for (let j = 0; j < cardsInFolder.length; j++) {
    //         const cardInFolder = cardsInFolder[j];
    //         imagePaths.push(cardInFolder.children[0].getAttribute("src"));
    //         cardInFolder.addEventListener("click", () => {
    //             imageViewer.open(imagePaths, j);
    //         });
    //     }
    // }

    // Кнопки закрытия для диалогов.
    // const closeBtns = content.getElementsByClassName("close-btn");
    // for (let i = 0; i < closeBtns.length; i++) {
    //     const closeBtn = closeBtns[i];
    //     closeBtn.addEventListener("click", () => {
    //         closeBtn.parentElement.close();
    //     });
    // }

    // Открываем диалог просмотра изображения при нажатии на карточку.
    const cardImgNodeList = document.querySelectorAll("#grid>figure>img");
    const imagePaths = []
    cardImgNodeList.forEach(img => imagePaths.push(img.getAttribute("src")));

    const cards = document.querySelectorAll("#grid>figure");
    cards.forEach((card, idx) => {
        card.addEventListener("click", () => {
            imageViewer.open(imagePaths, idx);
        });
    });

})