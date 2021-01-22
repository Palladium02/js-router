import Router from './router.js';
import home from './pages/home.js';
import about from './pages/about.js';

const router = new Router('.page-container', true, true);

router.get('/home', home);
router.get('/about', about);

setTimeout(() => {
    router.refresh();
}, 2000);

console.log(router);