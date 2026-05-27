import { MainPage } from './pages/main-page.js';
import { CalculatorPage } from './pages/calculator-page.js';
import { AboutPage } from './pages/about-page.js';
import { WeatherDetailPage } from './pages/WeatherDetailPage.js';

export class Router {
    constructor(root) {
        this.root = root;
        
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.onclick = (e) => {
                e.preventDefault();
                this.navigateToMain();
            };
        }
        
        document.querySelectorAll('[data-page]').forEach(link => {
            link.onclick = (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                if (page === 'calculator') this.navigateToCalculator();
                if (page === 'about') this.navigateToAbout();
            };
        });
    }
    
    navigateToMain() {
        const page = new MainPage(this.root, this);
        page.render();
    }
    
    navigateToCalculator() {
        const page = new CalculatorPage(this.root);
        page.render();
    }
    
    navigateToAbout() {
        const page = new AboutPage(this.root);
        page.render();
    }
    
    navigateToWeather(cityId) {
        const page = new WeatherDetailPage(this.root, cityId, this);
        page.render();
    }
}