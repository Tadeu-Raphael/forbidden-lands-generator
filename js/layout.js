(function () {
    const scriptUrl = document.currentScript.src;
    const appRoot = new URL("../", scriptUrl);
    const page = document.body.dataset.page;
    const repositoryId = "Tadeu-Raphael/gcity.github.io";
    const githubPagesHome = "https://tadeu-raphael.github.io/gcity.github.io/";
    const routes = {
        index: "index.html",
        village: "pages/village.html",
        dungeon: "pages/dungeon.html",
        castle: "pages/castle.html"
    };

    function isGithubPages() {
        return location.protocol === "https:"
            && location.hostname.toLowerCase() === "tadeu-raphael.github.io"
            && /^\/gcity\.github\.io(?:\/|$)/i.test(location.pathname);
    }

    function isLocalDevelopment() {
        const hostname = location.hostname.toLowerCase();
        return location.protocol === "file:"
            || (["http:", "https:"].includes(location.protocol)
                && (["localhost", "127.0.0.1", "::1"].includes(hostname) || hostname.endsWith(".localhost")));
    }

    function verifyLocalRepository() {
        return new Promise(resolve => {
            const marker = document.createElement("script");
            marker.src = new URL("../../../js/gcity-repository-marker.js", scriptUrl).href;
            marker.onload = () => {
                const isGcityRepository = document.documentElement.dataset.gcityRepository === repositoryId;
                delete document.documentElement.dataset.gcityRepository;
                marker.remove();
                resolve(isGcityRepository);
            };
            marker.onerror = () => {
                marker.remove();
                resolve(false);
            };
            document.head.appendChild(marker);
        });
    }

    async function configureGcityHomeLinks() {
        let homeUrl = null;
        const isGcityModule = /\/generators\/forbidden-lands\/$/i.test(appRoot.pathname);

        if (isGithubPages()) {
            homeUrl = githubPagesHome;
        } else if (isLocalDevelopment() && isGcityModule && await verifyLocalRepository()) {
            homeUrl = new URL("../../index.html", appRoot).href;
        }

        document.querySelectorAll("[data-gcity-home]").forEach(link => {
            if (homeUrl) {
                link.href = homeUrl;
                link.hidden = false;
            }
        });
    }

    function renderSharedLayout() {
        document.getElementById("site-header").innerHTML = `
            <header class="site-header">
                <div class="header-inner">
                    <a class="site-brand" data-route="index" data-i18n="Forbidden Lands Generator">Forbidden Lands Generator</a>
                    <nav class="site-navigation" data-i18n-aria="Main navigation" aria-label="Main navigation">
                        <a data-route="village" data-i18n="Village">Village</a>
                        <a data-route="dungeon" data-i18n="Dungeon">Dungeon</a>
                        <a data-route="castle" data-i18n="Castle">Castle</a>
                    </nav>
                    <a class="gcity-home-button" data-gcity-home data-i18n="← Back to G-City" hidden>← Back to G-City</a>
                </div>
            </header>`;
        document.getElementById("site-footer").innerHTML = `
            <footer class="site-footer">
                <p data-i18n="Forbidden Lands Generator · Tools for RPG adventures">Forbidden Lands Generator · Tools for RPG adventures</p>
                <a class="footer-gcity-link" data-gcity-home data-i18n="Back to G-City" hidden>Back to G-City</a>
                <div class="language-switch" role="group" aria-label="Language" data-i18n-aria="Language">
                    <button class="flag-button" type="button" data-lang-switch="pt" aria-pressed="false" title="Switch to Portuguese" data-i18n-title="Switch to Portuguese">
                        <svg viewBox="0 0 60 42" width="36" height="25" role="img" aria-label="Brazil" data-i18n-aria="Brazil">
                            <rect width="60" height="42" fill="#009b3a"/>
                            <polygon points="30,5 56,21 30,37 4,21" fill="#fedf00"/>
                            <circle cx="30" cy="21" r="9" fill="#002776"/>
                            <path d="M21.5 19.2 Q30 16.5 38.5 23" stroke="#fff" stroke-width="1.6" fill="none"/>
                        </svg>
                    </button>
                    <button class="flag-button" type="button" data-lang-switch="en" aria-pressed="false" title="Switch to English" data-i18n-title="Switch to English">
                        <svg viewBox="0 0 60 42" width="36" height="25" role="img" aria-label="UK / USA" data-i18n-aria="UK / USA">
                            <defs>
                                <clipPath id="flag-left"><rect width="30" height="42"/></clipPath>
                                <clipPath id="flag-right"><rect x="30" width="30" height="42"/></clipPath>
                            </defs>
                            <g clip-path="url(#flag-left)">
                                <rect width="60" height="42" fill="#012169"/>
                                <path d="M0 0L60 42M60 0L0 42" stroke="#fff" stroke-width="7"/>
                                <path d="M0 0L60 42M60 0L0 42" stroke="#c8102e" stroke-width="3"/>
                                <path d="M30 0V42M0 21H60" stroke="#fff" stroke-width="11"/>
                                <path d="M30 0V42M0 21H60" stroke="#c8102e" stroke-width="6"/>
                            </g>
                            <g clip-path="url(#flag-right)">
                                <rect x="30" width="30" height="42" fill="#fff"/>
                                <g fill="#b22234">
                                    <rect x="30" y="0" width="30" height="3.2"/><rect x="30" y="6.5" width="30" height="3.2"/>
                                    <rect x="30" y="13" width="30" height="3.2"/><rect x="30" y="19.5" width="30" height="3.2"/>
                                    <rect x="30" y="26" width="30" height="3.2"/><rect x="30" y="32.5" width="30" height="3.2"/>
                                    <rect x="30" y="38.8" width="30" height="3.2"/>
                                </g>
                                <rect x="30" y="0" width="14" height="22.5" fill="#3c3b6e"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </footer>`;
    }

    function setRoutes() {
        document.querySelectorAll("[data-route]").forEach(link => {
            const route = routes[link.dataset.route];
            if (!route) {
                throw new Error(`Unknown Forbidden Lands route: ${link.dataset.route}`);
            }
            link.href = new URL(route, appRoot).href;
            if (link.dataset.route === page) {
                link.setAttribute("aria-current", "page");
            }
        });
    }

    function loadScript(path) {
        return new Promise((resolve, reject) => {
            const element = document.createElement("script");
            element.src = new URL(path, appRoot).href;
            element.onload = resolve;
            element.onerror = () => reject(new Error(`Could not load script: ${path}`));
            document.body.appendChild(element);
        });
    }

    async function initialize() {
        try {
            renderSharedLayout();
            setRoutes();
            await loadScript("js/i18n.js");
            await configureGcityHomeLinks();
            if (page !== "index") {
                await loadScript("js/generation-core.js");
                await loadScript("js/generation-export.js");
                await loadScript(`js/${page}.js`);
                window.FLG.replayRerolls();
            }
            window.I18N.apply(document);
            if (window.FLG) {
                window.FLG.refresh();
                window.FLG.renderRollLog();
            }
        } catch (error) {
            console.error(error);
            const message = document.createElement("p");
            message.className = "layout-error";
            message.textContent = "The generator could not be loaded. Check the browser console for details.";
            document.querySelector("main")?.prepend(message);
        }
    }

    initialize();
}());
