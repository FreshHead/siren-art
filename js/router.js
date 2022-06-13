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
    if (hash === "#aerography") {
        const grid = document.getElementById("grid");
        const imagePaths = ["../img/автобус Рубин.jpeg", "../img/машина сакура.jpeg"];
        imagePaths.forEach(imagePath => {
            const card = document.createElement("div");
            card.classList.add("card")
            grid.appendChild(card);
            card.style.backgroundImage = `url('${imagePath}')`;
        });
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();