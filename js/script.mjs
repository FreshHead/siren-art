import Router from "./router.mjs";
const router = new Router();
// TODO: Подготовь изображения по соотношения карточек. Как вариант сделать превьюхи отдельно.
router.attachMatched((hash, html) => {
    // Открытие карточек-папок при нажатии.
    const folderCards = document.getElementsByClassName("folder");
    for (let i = 0; i < folderCards.length; i++) {
        const folderCard = folderCards[i];
        folderCard.addEventListener("click", () => {
            document.getElementById(folderCard.getAttribute("id") + "Dialog").showModal();
        });
    }
    // Кнопки закрытия для диалогов.
    const closeBtns = document.getElementsByClassName("closeBtn");
    for (let i = 0; i < closeBtns.length; i++) {
        const closeBtn = closeBtns[i];
        closeBtn.addEventListener("click", () => {
            closeBtn.parentElement.close();
        });
    }
})