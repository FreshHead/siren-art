function Router() {
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("header a").forEach((navLink) => {
            navLink.addEventListener("click", routeFunc.bind(this));
        });

        window.onpopstate = handleLocation.bind(this);
        window.route = routeFunc;

        handleLocation.bind(this)();

        function routeFunc(event) {
            event = event || window.event;
            event.preventDefault();
            window.history.pushState({}, "", event.target.href);
            handleLocation.bind(this)();
        }

        function handleLocation() {
            const hash = window.location.hash;

            const routes = {
                404: "pages/main.html",
                "/": "pages/main.html",
                "#aerography": "pages/aerography.html",
                "#walls": "pages/walls.html",
                "#sculptures": "pages/sculptures.html"
            };

            const route = routes[hash] || routes[404];

            //  Выделяем выбранный раздел, чтобы было понятнее.
            const categories = document.getElementsByClassName("category");
            for (let i = 0; i < categories.length; i++) {
                categories.item(i).classList.remove("selected");
            }
            getSelectedLink(hash).classList.add("selected");

            // Запрашиваем страницу и вставляем в div content.
            fetch(route).then((data) => {
                data.text().then(html => {
                    const contentDiv = document.getElementById("content");
                    contentDiv.innerHTML = html;
                    if (this.callbackFunc) {
                        this.callbackFunc(hash, contentDiv);
                    }
                });
            });
        };

        function getSelectedLink(hash) {
            const categoryMatch = hash.match(/#(\w*)/);
            if (categoryMatch) {
                const hashWithoutHashtag = categoryMatch[1];
                return document.getElementById(hashWithoutHashtag + "Link");
            } else {
                return document.getElementById("mainPageLink");
            }
        }
    });

    return {
        attachMatched: (callbackFunc) => {
            this.callbackFunc = callbackFunc;
        }
    };
}
export default Router