export default class Router {
    constructor(selector, history = false, debug = false) {
        this.rootElement = document.querySelector(selector);
        this.links = document.querySelectorAll('[data-link]');
        this.viewMap = {};
        this.currentView = '';
        this.history = history;
        this.debug = debug;
        this.pageCounter = 0;
        this.createLink();
        if (this.history)
            this.setPopTrap();
    }
    async get(route, view) {
        this.pageCounter++;
        if (this.pageCounter === 1) {
            this.rootElement.innerHTML = await view();
            this.currentView = route;
            if (this.history)
                window.history.replaceState(null, null, route);
        }
        this.viewMap[route] = view;
        return 0;
    }
    createLink() {
        this.links.forEach(link => {
            link.addEventListener('click', (event) => {
                let target = event.target;
                let path = target.getAttribute('data-link');
                if (path !== this.getCurrentView()) {
                    let view = this.viewMap[path];
                    this.currentView = path;
                    if (this.history)
                        window.history.pushState(null, null, path);
                    this.render(view);
                }
            });
        });
    }
    async render(view) {
        this.rootElement.innerHTML = await view();
    }
    getCurrentView() {
        return this.currentView;
    }
    async refresh() {
        let t0;
        if (this.debug)
            t0 = Date.now();
        let path = this.getCurrentView();
        await this.viewMap[path]();
        if (this.debug)
            console.log(`refreshed ${path}, rendered in ${Date.now() - t0}ms`);
        return 0;
    }
    async setPopTrap() {
        window.addEventListener('popstate', async () => {
            let path = location.pathname;
            this.rootElement.innerHTML = await this.viewMap[path]();
        });
        return 0;
    }
}
