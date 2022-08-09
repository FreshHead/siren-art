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

        const fullscreenCard = document.createElement("dialog");
        fullscreenCard.classList.add("fullscreen-card");

        const closeBtn = document.createElement("div");
        closeBtn.classList.add("close-btn");
        closeBtn.addEventListener("click", () => {
            fullscreenCard.open = false;
        });
        fullscreenCard.append(closeBtn);

        imageNames[folderName].forEach(imageName => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.addEventListener("click", () => {
                fullscreenCard.open = true;
                fullscreenCard.style.backgroundImage = card.style.backgroundImage;
                document.body.classList.add("modal-open");
                document.getElementById("main-page").append(fullscreenCard);
            })
            grid.appendChild(card);
            card.style.backgroundImage = `url('../img/${folderName}/${imageName}')`;
        });
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();