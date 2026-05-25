class Router {
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
        const cities = JSON.parse(localStorage.getItem('weatherCities')) || [];
        const city = cities.find(c => c.id == cityId);
        
        if (!city) {
            this.navigateToMain();
            return;
        }
        
        const tempValue = parseInt(city.temp);
        const isCold = tempValue < 0;
        
        this.root.innerHTML = `
            <div class="content-card-3d" id="weatherDetailCard" style="max-width: 600px; margin: 0 auto;">
                <button class="back-button" id="backBtn">← Назад к списку</button>
                <div style="text-align: center; position: relative;">
                    ${isCold ? `
                        <div id="snowflake3dContainer" style="position: absolute; top: -80px; right: -50px; width: 200px; height: 200px; z-index: 100; pointer-events: none;">
                            <canvas id="snowflakeCanvas" width="200" height="200" style="width: 200px; height: 200px;"></canvas>
                        </div>
                    ` : ''}
                    <h2 style="color: #2b5278;">🏙️ ${city.city}</h2>
                    <div class="temp-now-3d ${isCold ? 'cold-temp-detail' : ''}">${city.temp}°</div>
                    <div style="font-size: 18px; line-height: 2; background: #f8f9fa; padding: 20px; border-radius: 15px;">
                        <div>🌬️ Ветер: ${city.wind} м/с</div>
                        <div>💧 Влажность: ${city.humidity}%</div>
                        <div>☁️ ${city.condition}</div>
                    </div>
                    <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e8f0fe, #f0f7ff); border-radius: 15px;">
                        <h3 style="color: #2b5278;">📖 Описание</h3>
                        <p style="line-height: 1.6;">${city.desc}</p>
                    </div>
                    <button class="delete-btn" id="deleteCityBtn" style="margin-top: 30px; padding: 10px 20px;">🗑️ Удалить город</button>
                </div>
            </div>
        `;
        
        if (isCold) {
            setTimeout(() => {
                this.init3DSnowflake();
            }, 100);
        }
        
        const detailCard = document.getElementById('weatherDetailCard');
        if (detailCard && typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(detailCard, {
                max: 10,
                speed: 300,
                glare: true,
                "max-glare": 0.3,
                scale: 1.02
            });
        }
        
        document.getElementById('backBtn').onclick = () => this.navigateToMain();
        
        const deleteBtn = document.getElementById('deleteCityBtn');
        if (deleteBtn) {
            deleteBtn.onclick = () => {
                if (confirm(`Удалить город "${city.city}"?`)) {
                    const updated = cities.filter(c => c.id != cityId);
                    localStorage.setItem('weatherCities', JSON.stringify(updated));
                    this.navigateToMain();
                }
            };
        }
    }
    
    init3DSnowflake() {
        const canvas = document.getElementById('snowflakeCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        let rotationX = 0;
        let rotationY = 0;
        let rotationZ = 0;
        let time = 0;
        
        const points = [];
        const arms = 6;
        
        for (let i = 0; i < arms; i++) {
            const angle = (i * 360 / arms) * Math.PI / 180;
            for (let r = 0; r <= 1; r += 0.05) {
                const radius = 80 * r;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const z = Math.sin(angle * 2) * 15 * (1 - r);
                points.push({ x, y, z, r: radius / 80, angle });
                
                if (r > 0.3 && r < 0.7) {
                    const branchAngle = angle + Math.PI / 4;
                    const branchRadius = 20 * (1 - Math.abs(r - 0.5) * 2);
                    const bx = Math.cos(angle) * radius + Math.cos(branchAngle) * branchRadius;
                    const by = Math.sin(angle) * radius + Math.sin(branchAngle) * branchRadius;
                    const bz = Math.sin(angle * 3) * 10 * (1 - r);
                    points.push({ x: bx, y: by, z: bz, r: radius / 80, angle });
                }
            }
        }
        
        for (let i = 0; i <= 20; i++) {
            const radius = 15 * (i / 20);
            const angleStep = (i * 360 * 3) * Math.PI / 180;
            points.push({
                x: Math.cos(angleStep) * radius,
                y: Math.sin(angleStep) * radius,
                z: Math.sin(angleStep * 2) * 8,
                r: radius / 80,
                angle: angleStep
            });
        }
        
        function project3D(x, y, z) {
            const cosX = Math.cos(rotationX);
            const sinX = Math.sin(rotationX);
            const y1 = y * cosX - z * sinX;
            const z1 = y * sinX + z * cosX;
            
            const cosY = Math.cos(rotationY);
            const sinY = Math.sin(rotationY);
            const x2 = x * cosY + z1 * sinY;
            const z2 = -x * sinY + z1 * cosY;
            
            const cosZ = Math.cos(rotationZ);
            const sinZ = Math.sin(rotationZ);
            const x3 = x2 * cosZ - y1 * sinZ;
            const y3 = x2 * sinZ + y1 * cosZ;
            
            const scale = 600 / (600 + z2);
            const screenX = 100 + x3 * scale;
            const screenY = 100 + y3 * scale;
            
            return { x: screenX, y: screenY, scale };
        }
        
        function draw() {
            if (!ctx) return;
            
            ctx.clearRect(0, 0, 200, 200);
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#4a90e2';
            
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dist = Math.hypot(points[i].x - points[j].x, 
                                           points[i].y - points[j].y,
                                           points[i].z - points[j].z);
                    if (dist < 25 && points[i].angle === points[j].angle) {
                        const p1 = project3D(points[i].x, points[i].y, points[i].z);
                        const p2 = project3D(points[j].x, points[j].y, points[j].z);
                        
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        
                        const brightness = Math.min(1, Math.max(0, p1.scale));
                        ctx.strokeStyle = `rgba(100, 180, 255, ${0.3 + brightness * 0.5})`;
                        ctx.stroke();
                    }
                }
            }
            
            for (const point of points) {
                const projected = project3D(point.x, point.y, point.z);
                if (projected.scale > 0) {
                    const size = 3 * projected.scale;
                    const gradient = ctx.createRadialGradient(projected.x, projected.y, 0, projected.x, projected.y, size);
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * projected.scale})`);
                    gradient.addColorStop(1, `rgba(74, 144, 226, ${0.6 * projected.scale})`);
                    
                    ctx.beginPath();
                    ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    
                    ctx.beginPath();
                    ctx.arc(projected.x - size * 0.3, projected.y - size * 0.3, size * 0.3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * projected.scale})`;
                    ctx.fill();
                }
            }
            
            const center = project3D(0, 0, 0);
            const centerGradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 15);
            centerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            centerGradient.addColorStop(0.5, 'rgba(100, 180, 255, 0.8)');
            centerGradient.addColorStop(1, 'rgba(74, 144, 226, 0.4)');
            
            ctx.beginPath();
            ctx.arc(center.x, center.y, 12, 0, Math.PI * 2);
            ctx.fillStyle = centerGradient;
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        function animate() {
            time += 0.02;
            rotationX = Math.sin(time * 0.5) * 0.5;
            rotationY = time * 0.8;
            rotationZ = Math.sin(time * 0.7) * 0.3;
            
            draw();
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}