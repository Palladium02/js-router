export default class Router {
    rootElement: HTMLElement;
    links: NodeListOf<HTMLElement>;
    viewMap: object;
    currentView: string;
    history: boolean;
    debug: boolean;
    pageCounter: number;

    constructor(selector: string, history: boolean = false, debug: boolean = false) {
        this.rootElement = document.querySelector(selector);
        this.links = document.querySelectorAll('[data-link]');
        this.viewMap = {};
        this.currentView = '';
        this.history = history;
        this.debug = debug;
        this.pageCounter = 0;

        this.createLink();
        if(this.history) this.setPopTrap();
    }

    async get(route: string, view: Function) {
        this.pageCounter++;
        if(this.pageCounter === 1) {
            this.rootElement.innerHTML = await view();
            this.currentView = route;
            if(this.history) window.history.replaceState(null, null, route);
        }
        this.viewMap[route] = view;
        return 0;
    }

    createLink() {
        this.links.forEach(link => {
            link.addEventListener('click', (event) => {
                let target: any = event.target;
                let path: string = target.getAttribute('data-link');
                if(path !== this.getCurrentView()) {
                    let view = this.viewMap[path];
                    this.currentView = path;
                    if(this.history) window.history.pushState(null, null, path);
                    this.render(view);
                }
            });
        });
    }

    async render(view: Function) {
        this.rootElement.innerHTML = await view();
    }

    getCurrentView(): string {
        return this.currentView;
    }

    async refresh() {
        let t0;
        if(this.debug) t0 = Date.now();
        let path = this.getCurrentView();
        await this.viewMap[path]();
        if(this.debug) console.log(`refreshed ${path}, rendered in ${Date.now() - t0}ms`);

        return 0;
    }

    async setPopTrap() {
        window.addEventListener('popstate', async () => {
            let path: string = location.pathname;
            console.log(path);
            this.rootElement.innerHTML = await this.viewMap[path]();
        });

        return 0;
    }
}