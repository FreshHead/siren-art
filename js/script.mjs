import Router from "./router.mjs";
const router = new Router();
// TODO: Подготовь изображения по соотношения карточек. Как вариант сделать превьюхи отдельно.
router.attachMatched((hash, html) => {
    // TODO: с помощью селекторов навешивай логику, чтобы не подвязываться на конкретный хэш
    if (hash === "#aerography") {
        document.getElementById("rubinFolder").addEventListener("click", () => {
            document.getElementById("rubinDialog").showModal();
        });
    }
})