class MainPage {
    constructor(parent, router) {
        this.parent = parent;
        this.router = router;
        this.cities = this.loadCities();
    }

    loadCities() {
        const saved = localStorage.getItem('weatherCities');
        if (saved) {
            return JSON.parse(saved);
        }
        return [
            { id: 1, city: 'Москва', temp: '+5', wind: '5', humidity: '70', condition: 'Облачно', desc: 'Столица России, крупнейший город страны.' },
            { id: 2, city: 'Санкт-Петербург', temp: '+3', wind: '8', humidity: '85', condition: 'Дождь', desc: 'Северная столица, культурная жемчужина России.' },
            { id: 3, city: 'Новосибирск', temp: '-10', wind: '4', humidity: '75', condition: 'Снег', desc: 'Столица Сибири, крупнейший научный центр России.' }
        ];
    }

    saveCities() {
        localStorage.setItem('weatherCities', JSON.stringify(this.cities));
    }

    deleteCity(cityId, event) {
        event.stopPropagation();
        if (confirm('Удалить город?')) {
            this.cities = this.cities.filter(city => city.id != cityId);
            this.saveCities();
            this.render();
        }
    }

    goToCity(cityId) {
        this.router.navigateToWeather(cityId);
    }

    render() {
        this.parent.innerHTML = '';
        
        const html = `
            <div class="content-card" style="display: flex; gap: 30px;">
                <div style="flex: 1;">
                    <h2 style="color: #2b5278; margin-bottom: 25px;">Погода в городах России</h2>
                    
                    <div id="carouselContainer"></div>
                    
                    <hr style="margin: 40px 0 20px 0;">
                    <h3>➕ Добавить город</h3>
                    <div class="add-card-form">
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
                        <button class="add-card-btn" id="addBtn">Добавить город</button>
                    </div>
                </div>
                
                <div class="snowflake-sidebar-3d">
                    <h3 style="color: white; text-align: center; margin-bottom: 15px;">❄️ 3D Снежинка ❄️</h3>
                    <div id="snowflake-3d-container" style="width: 280px; height: 280px; margin: 0 auto;"></div>
                    <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 15px;">🖱️ Крути снежинку мышкой</p>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', html);
        this.drawCarousel();
        this.initSnowflake3D();
        
        document.getElementById('addBtn').onclick = () => {
            const city = document.getElementById('cityName').value;
            let temp = document.getElementById('cityTemp').value;
            const wind = document.getElementById('cityWind').value;
            const humidity = document.getElementById('cityHumidity').value;
            const condition = document.getElementById('cityCondition').value;
            const desc = document.getElementById('cityDesc').value || 'Новый город';
            
            if (city && temp && wind && humidity && condition) {
                if (parseFloat(temp) >= 0 && !temp.toString().startsWith('-')) temp = '+' + temp;
                
                const newId = this.cities.length > 0 ? Math.max(...this.cities.map(c => c.id)) + 1 : 1;
                this.cities.push({
                    id: newId, 
                    city: city, 
                    temp: temp,
                    wind: wind,
                    humidity: humidity, 
                    condition: condition, 
                    desc: desc
                });
                this.saveCities();
                this.render();
            } else {
                alert('Заполните все поля!');
            }
        };
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
            
            const snowflakeGroup = new THREE.Group();
            
            const armCount = 6;
            const armLength = 1.2;
            
            for (let i = 0; i < armCount; i++) {
                const angle = (i / armCount) * Math.PI * 2;
                
                const armGeometry = new THREE.CylinderGeometry(0.03, 0.08, armLength, 8);
                const armMaterial = new THREE.MeshStandardMaterial({
                    color: 0x88aaff,
                    emissive: 0x2266aa,
                    emissiveIntensity: 0.3,
                    metalness: 0.8,
                    roughness: 0.2
                });
                const arm = new THREE.Mesh(armGeometry, armMaterial);
                arm.position.x = Math.cos(angle) * armLength / 2;
                arm.position.z = Math.sin(angle) * armLength / 2;
                arm.rotation.z = angle;
                arm.rotation.x = Math.PI / 2;
                snowflakeGroup.add(arm);
                
                for (let j = 0.3; j <= 0.7; j += 0.2) {
                    const branchLength = 0.2;
                    const branchGeometry = new THREE.CylinderGeometry(0.02, 0.04, branchLength, 6);
                    const branchMaterial = new THREE.MeshStandardMaterial({
                        color: 0x99bbff,
                        emissive: 0x3377cc,
                        emissiveIntensity: 0.2,
                        metalness: 0.7
                    });
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
                const tipMaterial = new THREE.MeshStandardMaterial({
                    color: 0xccddff,
                    emissive: 0x4488dd,
                    emissiveIntensity: 0.4,
                    metalness: 0.9
                });
                const tip = new THREE.Mesh(tipGeometry, tipMaterial);
                tip.position.x = Math.cos(angle) * armLength;
                tip.position.z = Math.sin(angle) * armLength;
                snowflakeGroup.add(tip);
            }
            
            const centerGeometry = new THREE.IcosahedronGeometry(0.15, 0);
            const centerMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0x66aaff,
                emissiveIntensity: 0.5,
                metalness: 0.95,
                roughness: 0.1
            });
            const center = new THREE.Mesh(centerGeometry, centerMaterial);
            snowflakeGroup.add(center);
            
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                const smallCrystal = new THREE.Mesh(
                    new THREE.DodecahedronGeometry(0.05, 0),
                    new THREE.MeshStandardMaterial({
                        color: 0xaaccff,
                        emissive: 0x4488cc,
                        emissiveIntensity: 0.3,
                        metalness: 0.8
                    })
                );
                smallCrystal.position.x = Math.cos(angle) * 0.25;
                smallCrystal.position.z = Math.sin(angle) * 0.25;
                snowflakeGroup.add(smallCrystal);
            }
            
            const starsGeometry = new THREE.BufferGeometry();
            const starsCount = 800;
            const starsPositions = new Float32Array(starsCount * 3);
            for (let i = 0; i < starsCount; i++) {
                starsPositions[i * 3] = (Math.random() - 0.5) * 200;
                starsPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                starsPositions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 20;
            }
            starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
            const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 });
            const stars = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(stars);
            
            scene.add(snowflakeGroup);
            
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
            
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }
            animate();
        }, 100);
    }
    
    drawCarousel() {
        const container = document.getElementById('carouselContainer');
        
        if (this.cities.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:60px;">Нет городов. Добавьте первый!</p>';
            return;
        }
        
        let carouselHtml = `
            <div id="weatherCarousel" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
        `;
        
        this.cities.forEach((city, index) => {
            carouselHtml += `
                <button type="button" data-bs-target="#weatherCarousel" data-bs-slide-to="${index}" 
                    class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" 
                    aria-label="Slide ${index + 1}"></button>
            `;
        });
        
        carouselHtml += `
                </div>
                <div class="carousel-inner">
        `;
        
        this.cities.forEach((city, index) => {
            const tempValue = parseInt(city.temp);
            const isCold = tempValue < 0;
            
            carouselHtml += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}" data-city-id="${city.id}">
                    <div class="weather-carousel-card ${isCold ? 'cold-city' : ''}">
                        <div class="weather-card-header">
                            <h3>🏙️ ${city.city}</h3>
                        </div>
                        <div class="weather-card-body">
                            <div class="temp-now ${isCold ? 'cold-temp' : ''}">${city.temp}°</div>
                            <div class="weather-details">
                                <div>🌬️ Ветер: ${city.wind} м/с</div>
                                <div>💧 Влажность: ${city.humidity}%</div>
                                <div>☁️ ${city.condition}</div>
                                <div class="city-desc-preview">${city.desc.substring(0, 80)}${city.desc.length > 80 ? '...' : ''}</div>
                            </div>
                        </div>
                        <div class="weather-card-footer">
                            <button class="delete-btn" data-id="${city.id}">🗑️ Удалить</button>
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
        this.addCarouselStyles();
        
        document.querySelectorAll('.weather-carousel-card').forEach(card => {
            const parentSlide = card.closest('.carousel-item');
            const cityId = parseInt(parentSlide.dataset.cityId);
            
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-btn')) {
                    this.goToCity(cityId);
                }
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteCity(parseInt(btn.dataset.id), e);
            });
        });
    }
    
    addCarouselStyles() {
        if (document.getElementById('carousel-card-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'carousel-card-styles';
        style.textContent = `
            .weather-carousel-card {
                background: linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%);
                border-radius: 20px;
                padding: 30px;
                text-align: center;
                margin: 20px 60px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                transition: transform 0.3s, box-shadow 0.3s;
                position: relative;
                overflow: hidden;
                cursor: pointer;
            }
            
            .weather-carousel-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            
            .cold-city {
                background: linear-gradient(135deg, #e8f0ff 0%, #d4e4ff 100%);
                border: 2px solid #4a90e2;
            }
            
            .cold-temp {
                color: #4a90e2 !important;
                text-shadow: 0 0 10px rgba(74,144,226,0.5);
            }
            
            .weather-card-header h3 {
                color: #2b5278;
                font-size: 28px;
                margin-bottom: 20px;
            }
            
            .temp-now {
                font-size: 64px;
                font-weight: bold;
                color: #007FFF;
                margin: 15px 0;
            }
            
            .weather-details {
                color: #555;
                line-height: 1.8;
                font-size: 16px;
            }
            
            .city-desc-preview {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #e0e8f0;
                color: #666;
                font-style: italic;
            }
            
            .weather-card-footer {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 25px;
                padding-top: 15px;
                border-top: 1px solid #e0e8f0;
            }
            
            .carousel-control-prev-icon,
            .carousel-control-next-icon {
                background-color: #007FFF;
                border-radius: 50%;
                padding: 20px;
                background-size: 50%;
            }
            
            .carousel-indicators button {
                background-color: #2b5278;
            }
            
            .carousel-indicators .active {
                background-color: #007FFF;
            }
            
            @media (max-width: 1200px) {
                .content-card {
                    flex-direction: column;
                }
                .snowflake-sidebar-3d {
                    width: 100%;
                    margin-top: 20px;
                }
                .snowflake-sidebar-3d #snowflake-3d-container {
                    margin: 0 auto;
                }
            }
            
            @media (max-width: 768px) {
                .weather-carousel-card {
                    margin: 10px 20px;
                    padding: 20px;
                }
                .temp-now {
                    font-size: 42px;
                }
                .weather-card-header h3 {
                    font-size: 22px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}