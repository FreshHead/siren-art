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

        const fullscreenCard = document.getElementById("fullscreenCard");
        fullscreenCard.classList.add("fullscreen-card");

        const leftArrow = createArrow();
        fullscreenCard.append(leftArrow);

        const closeBtn = document.createElement("div");
        closeBtn.classList.add("close-btn");
        closeBtn.addEventListener("click", () => {
            fullscreenCard.close();
            document.body.classList.remove("modal-open");
        });
        fullscreenCard.append(closeBtn);

        imageNames[folderName].forEach(imageName => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.addEventListener("click", () => {
                fullscreenCard.showModal();
                fullscreenCard.style.backgroundImage = card.style.backgroundImage;
                document.body.classList.add("modal-open");
            })
            grid.appendChild(card);
            card.style.backgroundImage = `url('../img/${folderName}/${imageName}')`;
        });
    }
};

const createArrow = () => {
    const arrow = document.createElement("div");
    arrow.classList.add("fullscreen-arrow")
    return arrow;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();