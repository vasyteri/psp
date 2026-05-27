import { api, API_BASE } from '../api.js';

export class MainPage {
    constructor(parent, router) {
        this.parent = parent;
        this.router = router;
        this.cities = [];
        this.filterText = '';
        this.filterHot = false;
    }

    async loadCities(filter = '', hotOnly = false) {
        let url = API_BASE;
        if (filter) {
            url += `?city=${encodeURIComponent(filter)}`;
        }
        
        const { data, status } = await api.get(url);
        
        if (status === 200 && data) {
            let filteredData = data;
            if (hotOnly) {
                filteredData = data.filter(city => {
                    const tempValue = parseInt(city.temperature);
                    return tempValue >= 20;
                });
            }
            this.cities = filteredData;
            this.drawCarousel();
        } else {
            console.error('Ошибка загрузки городов:', status);
            this.cities = [];
            this.drawCarousel();
        }
    }

    async addCity(cityData) {
        const { data, status } = await api.post(API_BASE, cityData);
        
        if (status === 201) {
            await this.loadCities(this.filterText, this.filterHot);
            const inputs = ['cityName', 'cityTemp', 'cityWind', 'cityHumidity', 'cityCondition', 'cityDesc'];
            inputs.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
        } else {
            alert('Ошибка при добавлении города: ' + (data?.error || 'Неизвестная ошибка'));
        }
    }

    async deleteCity(cityId, event) {
        event.stopPropagation();
        if (confirm('Удалить город?')) {
            const { status } = await api.delete(`${API_BASE}/${cityId}`);
            if (status === 204) {
                await this.loadCities(this.filterText, this.filterHot);
                setTimeout(() => {
                    this.reinitCarousel();
                }, 50);
            } else {
                alert('Ошибка удаления города');
            }
        }
    }

    goToCity(cityId) {
        this.router.navigateToWeather(cityId);
    }

    toggleHotFilter() {
        this.filterHot = !this.filterHot;
        const hotFilterBtn = document.getElementById('hotFilterBtn');
        if (this.filterHot) {
            hotFilterBtn.style.background = '#ff6b35';
            hotFilterBtn.style.color = 'white';
            hotFilterBtn.innerHTML = '🔥 Жаркие города (от 20°) ✓';
        } else {
            hotFilterBtn.style.background = '#e9ecef';
            hotFilterBtn.style.color = '#333';
            hotFilterBtn.innerHTML = '🔥 Показать жаркие (от 20°)';
        }
        this.loadCities(this.filterText, this.filterHot);
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = `
            <div class="content-card" style="display: flex; gap: 30px; flex-wrap: wrap;">
                <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                        <h2 style="color: #2b5278; margin: 0;">Погода в городах России</h2>
                        <div style="display: flex; gap: 10px;">
                            <button id="hotFilterBtn" style="padding: 10px 20px; background: #e9ecef; border: none; border-radius: 25px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s;">
                                🔥 Показать жаркие (от 20°)
                            </button>
                            <button id="resetFilterBtn" style="padding: 10px 20px; background: #2b5278; color: white; border: none; border-radius: 25px; cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.3s;">
                                🗑️ Сбросить фильтр
                            </button>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <input type="text" id="filterInput" placeholder="🔍 Фильтр по названию города..." 
                               style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ddd; font-size: 16px;">
                    </div>
                    
                    <div id="carouselContainer" style="min-height: 500px;"></div>
                    
                    <hr style="margin: 40px 0 20px 0;">
                    <h3>➕ Добавить новый город</h3>
                    <div class="add-card-form" style="background: #f8f9fa; padding: 20px; border-radius: 15px;">
                        <div class="form-group">
                            <input type="text" id="cityName" placeholder="Название города">
                        </div>
                        <div class="form-group">
                            <input type="number" id="cityTemp" placeholder="Температура">
                        </div>
                        <div class="form-group">
                            <input type="number" id="cityWind" placeholder="Ветер (м/с)">
                        </div>
                        <div class="form-group">
                            <input type="number" id="cityHumidity" placeholder="Влажность (%)">
                        </div>
                        <div class="form-group">
                            <input type="text" id="cityCondition" placeholder="Погода">
                        </div>
                        <div class="form-group">
                            <textarea id="cityDesc" rows="2" placeholder="Описание"></textarea>
                        </div>
                        <button class="add-card-btn" id="addBtn" style="background: #28a745;">➕ Добавить город</button>
                    </div>
                </div>
                
                <div class="snowflake-sidebar-3d">
                    <h3>❄️ 3D Снежинка ❄️</h3>
                    <div id="snowflake-3d-container" style="width: 280px; height: 280px; margin: 0 auto;"></div>
                    <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 15px;">🖱️ Крути снежинку мышкой</p>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);
        
        document.getElementById('filterInput').addEventListener('input', (e) => {
            this.filterText = e.target.value;
            this.loadCities(this.filterText, this.filterHot);
        });
        
        document.getElementById('hotFilterBtn').addEventListener('click', () => {
            this.toggleHotFilter();
        });
        
        document.getElementById('resetFilterBtn').addEventListener('click', () => {
            this.filterText = '';
            this.filterHot = false;
            document.getElementById('filterInput').value = '';
            const hotFilterBtn = document.getElementById('hotFilterBtn');
            hotFilterBtn.style.background = '#e9ecef';
            hotFilterBtn.style.color = '#333';
            hotFilterBtn.innerHTML = '🔥 Показать жаркие (от 20°)';
            this.loadCities('', false);
        });
        
        document.getElementById('addBtn').onclick = async () => {
            const city = document.getElementById('cityName').value;
            let temp = document.getElementById('cityTemp').value;
            const wind = document.getElementById('cityWind').value;
            const humidity = document.getElementById('cityHumidity').value;
            const condition = document.getElementById('cityCondition').value;
            const desc = document.getElementById('cityDesc').value || 'Новый город';
            
            if (city && temp && wind && humidity && condition) {
                if (parseFloat(temp) >= 0 && !temp.toString().startsWith('-')) {
                    temp = '+' + temp;
                }
                
                await this.addCity({
                    city: city,
                    temperature: temp,
                    wind: wind,
                    humidity: humidity,
                    condition: condition,
                    desc: desc
                });
            } else {
                alert('Заполните все поля!');
            }
        };
        
        this.loadCities();
        this.initSnowflake3D();
    }
    
    drawCarousel() {
        const container = document.getElementById('carouselContainer');
        if (!container) return;
        
        if (this.cities.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:60px;">Нет городов. Добавьте первый!</p>';
            return;
        }
        
        const carouselStyles = `
            <style>
                #weatherCarousel {
                    position: relative;
                }
                #weatherCarousel .carousel-inner {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    min-height: 480px;
                }
                #weatherCarousel .carousel-item {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: auto;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
                    display: block !important;
                    transform: none !important;
                }
                #weatherCarousel .carousel-item.active {
                    position: relative;
                    opacity: 1;
                    visibility: visible;
                }
                #weatherCarousel .carousel-item-next,
                #weatherCarousel .carousel-item-prev {
                    opacity: 0;
                    visibility: hidden;
                }
                #weatherCarousel .carousel-control-prev,
                #weatherCarousel .carousel-control-next {
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 50%;
                    opacity: 0.9;
                    transition: all 0.3s ease;
                    z-index: 10;
                }
                #weatherCarousel .carousel-control-prev {
                    left: -25px;
                }
                #weatherCarousel .carousel-control-next {
                    right: -25px;
                }
                #weatherCarousel .carousel-control-prev:hover,
                #weatherCarousel .carousel-control-next:hover {
                    background: #007FFF;
                    opacity: 1;
                    transform: translateY(-50%) scale(1.1);
                }
                #weatherCarousel .carousel-control-prev-icon,
                #weatherCarousel .carousel-control-next-icon {
                    width: 30px;
                    height: 30px;
                }
                .weather-card {
                    background: #ffffff;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    border-radius: 20px;
                    padding: 30px;
                    text-align: center;
                    margin: 10px 60px;
                    cursor: pointer;
                    transition: box-shadow 0.3s;
                    width: calc(100% - 120px);
                }
                .weather-card:hover {
                    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
                }
                #weatherCarousel .carousel-indicators {
                    position: relative;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                #weatherCarousel .carousel-indicators button {
                    background-color: #007FFF;
                    width: 40px;
                    height: 4px;
                    margin: 0 5px;
                    border-radius: 2px;
                    opacity: 0.5;
                }
                #weatherCarousel .carousel-indicators button.active {
                    opacity: 1;
                }
            </style>
        `;
        
        let carouselHtml = carouselStyles;
        carouselHtml += `
            <div id="weatherCarousel" class="carousel slide" data-bs-ride="false" data-bs-interval="false" data-bs-wrap="true">
                <div class="carousel-indicators">
        `;
        
        this.cities.forEach((city, index) => {
            carouselHtml += `<button type="button" data-bs-target="#weatherCarousel" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index + 1}"></button>`;
        });
        
        carouselHtml += `</div><div class="carousel-inner">`;
        
        this.cities.forEach((city, index) => {
            const tempValue = parseInt(city.temperature);
            const isHot = tempValue >= 20;
            
            carouselHtml += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}" data-city-id="${city.id}">
                    <div class="weather-card">
                        <div class="weather-card-header">
                            <h3 style="color: #2b5278; margin: 0;">🏙️ ${city.city}</h3>
                        </div>
                        <div class="weather-card-body">
                            <div class="temp-now" style="color: ${isHot ? '#ff6b35' : '#2b5278'}; font-size: 64px; font-weight: bold; margin: 15px 0;">
                                ${city.temperature}°
                            </div>
                            <div class="weather-details" style="color: #555; line-height: 1.8;">
                                <div>🌬️ Ветер: ${city.wind} м/с</div>
                                <div>💧 Влажность: ${city.humidity}%</div>
                                <div>☁️ ${city.condition}</div>
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e8f0; color: #666; font-style: italic;">
                                    ${(city.desc || '').substring(0, 100)}${(city.desc || '').length > 100 ? '...' : ''}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0e8f0;">
                            <button class="delete-btn" data-id="${city.id}" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; transition: background 0.3s;">🗑️ Удалить</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        carouselHtml += `
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#weatherCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#weatherCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;
        
        container.innerHTML = carouselHtml;
        
        document.querySelectorAll('.weather-card').forEach(card => {
            const parentSlide = card.closest('.carousel-item');
            if (parentSlide) {
                const cityId = parseInt(parentSlide.dataset.cityId);
                card.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('delete-btn')) {
                        this.goToCity(cityId);
                    }
                });
            }
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteCity(parseInt(btn.dataset.id), e);
            });
        });
        
        this.reinitCarousel();
    }
    
    reinitCarousel() {
        const carouselElement = document.getElementById('weatherCarousel');
        if (carouselElement && typeof bootstrap !== 'undefined') {
            const oldCarousel = bootstrap.Carousel.getInstance(carouselElement);
            if (oldCarousel) {
                oldCarousel.dispose();
            }
            
            new bootstrap.Carousel(carouselElement, { 
                interval: false,
                ride: false,
                wrap: true
            });
            
            carouselElement.addEventListener('slide.bs.carousel', function (event) {
                const allItems = document.querySelectorAll('#weatherCarousel .carousel-item');
                allItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.visibility = 'hidden';
                });
                
                const nextItem = event.relatedTarget;
                if (nextItem) {
                    setTimeout(() => {
                        nextItem.style.opacity = '1';
                        nextItem.style.visibility = 'visible';
                    }, 10);
                }
            });
        }
    }
    
    async initSnowflake3D() {
        setTimeout(async () => {
            const container = document.getElementById('snowflake-3d-container');
            if (!container) return;
            
            const THREE = await import('three');
            
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a0a2a);
            scene.fog = new THREE.FogExp2(0x0a0a2a, 0.008);
            
            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            camera.position.set(2, 2, 3);
            camera.lookAt(0, 0, 0);
            
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(280, 280);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
            
            const ambientLight = new THREE.AmbientLight(0x404060);
            scene.add(ambientLight);
            
            const mainLight = new THREE.DirectionalLight(0xffffff, 1);
            mainLight.position.set(1, 2, 1);
            scene.add(mainLight);
            
            const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
            backLight.position.set(-1, 1, -1);
            scene.add(backLight);
            
            const colors = [0xff66cc, 0x66ffcc, 0x66ccff];
            const coloredLights = [];
            for (let i = 0; i < 3; i++) {
                const light = new THREE.PointLight(colors[i], 0.3);
                light.position.set(Math.sin(i * Math.PI * 2 / 3) * 2, 1, Math.cos(i * Math.PI * 2 / 3) * 2);
                scene.add(light);
                coloredLights.push(light);
            }
            
            const snowflakeGroup = new THREE.Group();
            const armCount = 6;
            const armLength = 1.2;
            
            for (let i = 0; i < armCount; i++) {
                const angle = (i / armCount) * Math.PI * 2;
                
                const armGeometry = new THREE.CylinderGeometry(0.03, 0.08, armLength, 8);
                const armMaterial = new THREE.MeshStandardMaterial({ color: 0x88aaff, emissive: 0x2266aa, emissiveIntensity: 0.3, metalness: 0.8, roughness: 0.2 });
                const arm = new THREE.Mesh(armGeometry, armMaterial);
                arm.position.x = Math.cos(angle) * armLength / 2;
                arm.position.z = Math.sin(angle) * armLength / 2;
                arm.rotation.z = angle;
                arm.rotation.x = Math.PI / 2;
                snowflakeGroup.add(arm);
                
                for (let j = 0.3; j <= 0.7; j += 0.2) {
                    const branchGeometry = new THREE.CylinderGeometry(0.02, 0.04, 0.2, 6);
                    const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x99bbff, emissive: 0x3377cc, emissiveIntensity: 0.2, metalness: 0.7 });
                    const branch = new THREE.Mesh(branchGeometry, branchMaterial);
                    const posX = Math.cos(angle) * armLength * j;
                    const posZ = Math.sin(angle) * armLength * j;
                    branch.position.x = posX;
                    branch.position.z = posZ;
                    branch.rotation.z = angle + Math.PI / 4;
                    branch.rotation.x = Math.PI / 2;
                    snowflakeGroup.add(branch);
                    
                    const branch2 = new THREE.Mesh(branchGeometry, branchMaterial);
                    branch2.position.x = posX;
                    branch2.position.z = posZ;
                    branch2.rotation.z = angle - Math.PI / 4;
                    branch2.rotation.x = Math.PI / 2;
                    snowflakeGroup.add(branch2);
                }
                
                const tipGeometry = new THREE.SphereGeometry(0.07, 16, 16);
                const tipMaterial = new THREE.MeshStandardMaterial({ color: 0xccddff, emissive: 0x4488dd, emissiveIntensity: 0.4, metalness: 0.9 });
                const tip = new THREE.Mesh(tipGeometry, tipMaterial);
                tip.position.x = Math.cos(angle) * armLength;
                tip.position.z = Math.sin(angle) * armLength;
                snowflakeGroup.add(tip);
            }
            
            const centerGeometry = new THREE.IcosahedronGeometry(0.15, 0);
            const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x66aaff, emissiveIntensity: 0.5, metalness: 0.95, roughness: 0.1 });
            const center = new THREE.Mesh(centerGeometry, centerMaterial);
            snowflakeGroup.add(center);
            
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const smallCrystal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), new THREE.MeshStandardMaterial({ color: 0xaaccff, emissive: 0x4488cc, emissiveIntensity: 0.3, metalness: 0.8 }));
                smallCrystal.position.x = Math.cos(angle) * 0.25;
                smallCrystal.position.z = Math.sin(angle) * 0.25;
                snowflakeGroup.add(smallCrystal);
            }
            
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesPositions = new Float32Array(300 * 3);
            for (let i = 0; i < 300; i++) {
                particlesPositions[i * 3] = (Math.random() - 0.5) * 3;
                particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
                particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
            }
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
            const particlesMaterial = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.01, transparent: true, opacity: 0.5 });
            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            snowflakeGroup.add(particles);
            
            scene.add(snowflakeGroup);
            
            const starsGeometry = new THREE.BufferGeometry();
            const starsPositions = new Float32Array(800 * 3);
            for (let i = 0; i < 800; i++) {
                starsPositions[i * 3] = (Math.random() - 0.5) * 200;
                starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
            }
            starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
            const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 });
            const stars = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(stars);
            
            let isDragging = false;
            let previousMousePosition = { x: 0, y: 0 };
            let rotationX = 0;
            let rotationY = 0;
            const canvas = renderer.domElement;
            
            canvas.addEventListener('mousedown', (e) => {
                isDragging = true;
                previousMousePosition = { x: e.clientX, y: e.clientY };
                canvas.style.cursor = 'grabbing';
            });
            
            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                rotationY += deltaX * 0.01;
                rotationX += deltaY * 0.01;
                snowflakeGroup.rotation.x = rotationX;
                snowflakeGroup.rotation.y = rotationY;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            });
            
            window.addEventListener('mouseup', () => {
                isDragging = false;
                canvas.style.cursor = 'grab';
            });
            canvas.style.cursor = 'grab';
            
            let time = 0;
            function animate() {
                requestAnimationFrame(animate);
                time += 0.01;
                snowflakeGroup.children.forEach((child, index) => {
                    if (child.isMesh && child.material && child.material.emissiveIntensity !== undefined) {
                        child.material.emissiveIntensity = 0.3 + Math.sin(time + index) * 0.2;
                    }
                });
                coloredLights.forEach((light, i) => { light.intensity = 0.2 + Math.sin(time * 2 + i) * 0.15; });
                particles.rotation.y += 0.005;
                particles.rotation.x = Math.sin(time * 0.5) * 0.1;
                stars.rotation.y += 0.0005;
                renderer.render(scene, camera);
            }
            animate();
        }, 100);
    }
}