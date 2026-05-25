import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app-root');
    const router = new Router(root);
    router.navigateToMain();
});