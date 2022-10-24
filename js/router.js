const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

// TODO: контрол imageViewer. Даёшь ему путь до папки с изображениями srcFolder и расширение изображения. 
// TODO: Он отнаследован от диалога. Он отображает все изображения начиная с 0.
// TODO: Контрол cardGrid. Внутри него элемент Card. cardGrid просто расставляет их.
// TODO: Контрол card. Даёшь ему изображение и title карточки. Так же можно определить, что будет при нажатии на неё.
// const imageNames = {
//     aerography: [{
//         name: "Рубин",
//         images: ["bus_rubin.jpeg"]
//     }, {
//         name: "Ока самурая",
//         images: ["car_sakura.jpeg"]
//     }, {
//         name: "Капот со львом",
//         images: ["car_lion.jpg"]
//     }, {
//         name: "Чистый город",
//         images: ["truck_garbage.jpeg"]
//     }],
//     walls: [{
//             name: "Aquapark",
//             length: 20
//         }, {
//             name: "Офис Аксолит",
//             images: ["tank.jpeg"],
//         }, {
//             name: "Греция в доме",
//             images: ["grece_park.jpeg", "grece.jpg", "roof_grece.jpg"]
//         },
//         {
//             name: "Магазин Харлей",
//             images: ["harley_davidson.jpeg"]
//         },
//         {
//             name: "Забор частного дома",
//             images: ["gate.jpg", "gate2.jpg"]
//         },
//         {
//             name: "Забор берёзы",
//             images: ["birch_fence.jpg"]
//         }
//     ],
//     sculptures: [{
//         name: "Ривьерик",
//         images: ["riverick.jpeg"]
//     }, {
//         name: "Барс",
//         images: ["bars.jpg"]
//     }, {
//         name: "Иисус для церкви",
//         images: ["jesus.jpeg"]
//     }, {
//         name: "Богиня в кафе",
//         images: ["lady.jpeg"]
//     }, {
//         name: "Матрёшка Глэм",
//         images: ["matryoshka.jpeg"]
//     }]
// };

const DOMContentLoadedPromise = new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => {

        document.querySelectorAll("header a").forEach(btn => btn.addEventListener("click", route));

        // const fullscreenCard = document.getElementById("fullscreenCard");
        // const closeBtn = document.getElementById("closeBtn");
        // closeBtn.addEventListener("click", () => {
        //     fullscreenCard.close();
        //     document.body.classList.remove("modal-open");
        // });

        // const changeImage = (isForward) => {
        //     const categoryName = fullscreenCard.getAttribute("categoryName");
        //     let projectIndex = Number(fullscreenCard.getAttribute("projectIndex"));

        //     const lastProjectIndex = imageNames[categoryName].length - 1;
        //     if (isForward) {
        //         projectIndex = projectIndex >= lastProjectIndex ? 0 : projectIndex + 1;
        //     } else {
        //         projectIndex = projectIndex <= 0 ? lastProjectIndex : projectIndex - 1;
        //     }
        //     fullscreenCard.setAttribute("projectIndex", projectIndex);
        //     fullscreenCard.style.backgroundImage = getImageUrl(categoryName, imageNames[categoryName][projectIndex].name, imageNames[categoryName][projectIndex].images[0]);
        // }

        // document.getElementById("leftArrow").addEventListener("click", () => {
        //     changeImage(false);
        // });

        // document.getElementById("rightArrow").addEventListener("click", (event) => {
        //     changeImage(true);
        // });
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

const getImageUrl = (categoryName, projectName, imageName) => {
    return `url('../img/${categoryName}/${projectName}/${imageName}')`;
}

const handleLocation = async () => {
    // await DOMContentLoadedPromise;
    const hash = window.location.hash;


    //  Выделяем выбранный раздел, чтобы было понятнее.
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
    document.getElementById("content").innerHTML = html;

    // const categoryName = hash.slice(1);
    // if (hash === "#aerography" || hash === "#walls" || hash === "#sculptures") {
    //     const grid = document.getElementById("grid");

    //     imageNames[categoryName].forEach((project, idx) => {
    //         const card = document.createElement("div");
    //         card.classList.add("card");

    //         card.addEventListener("click", () => {
    //             fullscreenCard.setAttribute("categoryName", categoryName);
    //             fullscreenCard.setAttribute("projectIndex", idx);
    //             fullscreenCard.showModal();
    //             fullscreenCard.style.backgroundImage = card.style.backgroundImage;
    //             document.body.classList.add("modal-open");

    //             for (let i = 0; i < imageNames[categoryName].length; i++) {
    //                 const oSubPreview = document.createElement("div");
    //                 const subImageUrl = getImageUrl(categoryName, imageNames[categoryName][idx].name, i + ".jpg");
    //                 oSubPreview.style.backgroundImage = subImageUrl;
    //                 // TODO: Не совсем интуитивно, что стрелочки перемешают по категориям, а полоска снизу по изобажениям. Возможно круче сделать 2 полоски: сверху с категориями, а снизу с изображениями в этой категории и у каждой свои стрелочки.
    //                 // TODO: Правда тогда и панели с карточками не нужны.
    //                 // TODO: Или из карточек с категориями, сделать проваливание в карточки с изображениями, а уже оттуда в просмотр. Но тогда карточки с одной картинкой будут выглядеть пустовато.
    //                 // TODO: Значит если картинка 1, то выводим просмотровщик, если нет, то выводим карточки
    //                 oSubPreview.addEventListener("click", () => {
    //                     fullscreenCard.style.backgroundImage = subImageUrl;
    //                 });
    //                 document.getElementById("subImages").appendChild(oSubPreview);
    //             }
    //         })
    //         grid.appendChild(card);
    //         card.style.backgroundImage = getImageUrl(categoryName, project.name, "0.jpg");
    //     });
    // }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();