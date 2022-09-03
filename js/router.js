const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("header a").forEach(btn => btn.addEventListener("click", route));
});

const routes = {
    404: "pages/main.html",
    "/": "pages/main.html",
    "#aerography": "pages/aerography.html",
    "#walls": "pages/walls.html",
    "#sculptures": "pages/sculptures.html"
};

const getImageUrl = (folderName, imageName) => {
    return `url('../img/${folderName}/${imageName}')`;
}

const changeImage = (fullscreenCard, imageNames, folderName, isForward) => {
    let imageIndex = Number(fullscreenCard.getAttribute("imageIndex"));
    const lastImage = imageNames[folderName].length - 1;
    if (isForward) {
        imageIndex = imageIndex >= lastImage ? 0 : imageIndex + 1;
    } else {
        imageIndex = imageIndex <= 0 ? lastImage : imageIndex - 1;
    }
    const imageName = imageNames[folderName][imageIndex];
    fullscreenCard.setAttribute("imageIndex", imageIndex);
    fullscreenCard.style.backgroundImage = getImageUrl(folderName, imageName);
}
// TODO: Вынеси из handleLocation инициализацию.
const handleLocation = async () => {
    const hash = window.location.hash;
    const route = routes[hash] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    // TODO: Сначала сделай в перемежку, а потом подгруппы если что. То есть покидай всю аэрографию
    const folderName = hash.slice(1);
    if (hash === "#aerography" || hash === "#walls" || hash === "#sculptures") {
        const grid = document.getElementById("grid");
        const imageNames = {
            aerography: ["bus_rubin.jpeg", "car_sakura.jpeg", "car_lion.jpg", "truck_garbage.jpeg"],
            walls: ["jack_sparrow.jpeg", "tank.jpeg", "grece_park.jpeg", "grece.jpg", "roof_grece.jpg", "harley_davidson.jpeg", "gate.jpg"],
            sculptures: ["riverick.jpeg", "bars.jpg", "jesus.jpeg", "lady.jpeg", "matryoshka.jpeg"]
        };

        // Создаём карточки для галереи.
        imageNames[folderName].forEach((imageName, idx) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.addEventListener("click", () => {
                fullscreenCard.setAttribute("imageIndex", idx);
                fullscreenCard.showModal();
                fullscreenCard.style.backgroundImage = card.style.backgroundImage;
                document.body.classList.add("modal-open");
            })
            grid.appendChild(card);
            card.style.backgroundImage = getImageUrl(folderName, imageName);
        });

        // Режим с ратягиванием картинки на весь экран.
        const fullscreenCard = document.getElementById("fullscreenCard");
        fullscreenCard.classList.add("fullscreen-card");

        const closeBtn = document.getElementById("closeBtn");
        closeBtn.addEventListener("click", () => {
            fullscreenCard.close();
            document.body.classList.remove("modal-open");
        });

        document.getElementById("leftArrow").addEventListener("click", () => {
            changeImage(fullscreenCard, imageNames, folderName, false);
        });

        document.getElementById("rightArrow").addEventListener("click", (event) => {
            changeImage(fullscreenCard, imageNames, folderName, true);
        });
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();