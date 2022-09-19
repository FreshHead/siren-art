const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const imageNames = {
    aerography: ["bus_rubin.jpeg", "car_sakura.jpeg", "car_lion.jpg", "truck_garbage.jpeg"],
    walls: ["jack_sparrow.jpeg", "tank.jpeg", "grece_park.jpeg", "grece.jpg", "roof_grece.jpg", "harley_davidson.jpeg", "gate.jpg"],
    sculptures: ["riverick.jpeg", "bars.jpg", "jesus.jpeg", "lady.jpeg", "matryoshka.jpeg"]
};

const DOMContentLoadedPromise = new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {

        document.querySelectorAll("header a").forEach(btn => btn.addEventListener("click", route));

        const fullscreenCard = document.getElementById("fullscreenCard");
        const closeBtn = document.getElementById("closeBtn");
        closeBtn.addEventListener("click", () => {
            fullscreenCard.close();
            document.body.classList.remove("modal-open");
        });

        const changeImage = (isForward) => {
            let imageIndex = Number(fullscreenCard.getAttribute("imageIndex"));
            const folderName = fullscreenCard.getAttribute("folderName");
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

        document.getElementById("leftArrow").addEventListener("click", () => {
            changeImage(false);
        });

        document.getElementById("rightArrow").addEventListener("click", (event) => {
            changeImage(true);
        });
        resolve();
    });
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

const handleLocation = async () => {
    await DOMContentLoadedPromise;
    const hash = window.location.hash;


    // TODO: Выдяем цветом выбранный раздел, чтобы было понятнее.
    const categories = document.getElementsByClassName("category");
    for (let i = 0; i < categories.length; i++) {
        categories.item(i).classList.remove("selectedCategory");
    }
    categoryMatch = hash.match(/#(\w*)/);
    if (categoryMatch) {
        const hashWithoutHashtag = categoryMatch[1];
        const selectedCategory = document.getElementById(hashWithoutHashtag + "Link");
        if (selectedCategory) {
            selectedCategory.classList.add("selectedCategory");
        }
    }

    const route = routes[hash] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;

    const folderName = hash.slice(1);
    if (hash === "#aerography" || hash === "#walls" || hash === "#sculptures") {
        const grid = document.getElementById("grid");

        imageNames[folderName].forEach((imageName, idx) => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.addEventListener("click", () => {
                fullscreenCard.setAttribute("imageIndex", idx);
                fullscreenCard.setAttribute("folderName", folderName);
                fullscreenCard.showModal();
                fullscreenCard.style.backgroundImage = card.style.backgroundImage;
                document.body.classList.add("modal-open");
            })
            grid.appendChild(card);
            card.style.backgroundImage = getImageUrl(folderName, imageName);
        });
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();