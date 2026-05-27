(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const J="modulepreload",K=function(p){return"/"+p},W={},Z=function(i,t,e){let n=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),s=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));n=Promise.allSettled(t.map(c=>{if(c=K(c),c in W)return;W[c]=!0;const y=c.endsWith(".css"),v=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${v}`))return;const l=document.createElement("link");if(l.rel=y?"stylesheet":J,y||(l.as="script"),l.crossOrigin="",l.href=c,s&&l.setAttribute("nonce",s),document.head.appendChild(l),y)return new Promise((w,u)=>{l.addEventListener("load",w),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(r){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r}return n.then(r=>{for(const s of r||[])s.status==="rejected"&&o(s.reason);return i().catch(o)})},m="http://localhost:3000/api/cities";class Q{async get(i){try{const t=await fetch(i);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return{data:await t.json(),status:t.status}}catch(t){return console.error("GET error:",t),{data:null,status:500}}}async post(i,t){try{const e=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return{data:e.status===204?null:await e.json(),status:e.status}}catch(e){return console.error("POST error:",e),{data:null,status:500}}}async patch(i,t){try{const e=await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return{data:e.status===204?null:await e.json(),status:e.status}}catch(e){return console.error("PATCH error:",e),{data:null,status:500}}}async delete(i){try{return{data:null,status:(await fetch(i,{method:"DELETE"})).status}}catch(t){return console.error("DELETE error:",t),{data:null,status:500}}}}const b=new Q;class tt{constructor(i,t){this.parent=i,this.router=t,this.cities=[],this.filterText="",this.filterHot=!1}async loadCities(i="",t=!1){let e=m;i&&(e+=`?city=${encodeURIComponent(i)}`);const{data:n,status:o}=await b.get(e);if(o===200&&n){let r=n;t&&(r=n.filter(s=>parseInt(s.temperature)>=20)),this.cities=r,this.drawCarousel()}else console.error("Ошибка загрузки городов:",o),this.cities=[],this.drawCarousel()}async addCity(i){const{data:t,status:e}=await b.post(m,i);e===201?(await this.loadCities(this.filterText,this.filterHot),["cityName","cityTemp","cityWind","cityHumidity","cityCondition","cityDesc"].forEach(o=>{const r=document.getElementById(o);r&&(r.value="")})):alert("Ошибка при добавлении города: "+((t==null?void 0:t.error)||"Неизвестная ошибка"))}async deleteCity(i,t){if(t.stopPropagation(),confirm("Удалить город?")){const{status:e}=await b.delete(`${m}/${i}`);e===204?await this.loadCities(this.filterText,this.filterHot):alert("Ошибка удаления города")}}goToCity(i){this.router.navigateToWeather(i)}toggleHotFilter(){this.filterHot=!this.filterHot;const i=document.getElementById("hotFilterBtn");this.filterHot?(i.style.background="#ff6b35",i.style.color="white",i.innerHTML="🔥 Жаркие города (от 20°) ✓"):(i.style.background="#e9ecef",i.style.color="#333",i.innerHTML="🔥 Показать жаркие (от 20°)"),this.loadCities(this.filterText,this.filterHot)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",`
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
                    
                    <div id="carouselContainer"></div>
                    
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
        `),document.getElementById("filterInput").addEventListener("input",t=>{this.filterText=t.target.value,this.loadCities(this.filterText,this.filterHot)}),document.getElementById("hotFilterBtn").addEventListener("click",()=>{this.toggleHotFilter()}),document.getElementById("resetFilterBtn").addEventListener("click",()=>{this.filterText="",this.filterHot=!1,document.getElementById("filterInput").value="";const t=document.getElementById("hotFilterBtn");t.style.background="#e9ecef",t.style.color="#333",t.innerHTML="🔥 Показать жаркие (от 20°)",this.loadCities("",!1)}),document.getElementById("addBtn").onclick=async()=>{const t=document.getElementById("cityName").value;let e=document.getElementById("cityTemp").value;const n=document.getElementById("cityWind").value,o=document.getElementById("cityHumidity").value,r=document.getElementById("cityCondition").value,s=document.getElementById("cityDesc").value||"Новый город";t&&e&&n&&o&&r?(parseFloat(e)>=0&&!e.toString().startsWith("-")&&(e="+"+e),await this.addCity({city:t,temperature:e,wind:n,humidity:o,condition:r,desc:s})):alert("Заполните все поля!")},this.loadCities(),this.initSnowflake3D()}drawCarousel(){const i=document.getElementById("carouselContainer");if(!i)return;if(this.cities.length===0){i.innerHTML='<p style="text-align:center; padding:60px;">Нет городов. Добавьте первый!</p>';return}let t=`
            <div id="weatherCarousel" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
        `;this.cities.forEach((e,n)=>{t+=`<button type="button" data-bs-target="#weatherCarousel" data-bs-slide-to="${n}" class="${n===0?"active":""}"></button>`}),t+='</div><div class="carousel-inner">',this.cities.forEach((e,n)=>{const r=parseInt(e.temperature)>=20;t+=`
                <div class="carousel-item ${n===0?"active":""}" data-city-id="${e.id}">
                    <div class="weather-card" style="background: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 20px; padding: 30px; text-align: center; margin: 20px 60px; cursor: pointer; transition: transform 0.3s;">
                        <div class="weather-card-header">
                            <h3 style="color: #2b5278;">🏙️ ${e.city}</h3>
                        </div>
                        <div class="weather-card-body">
                            <div class="temp-now" style="color: ${r?"#ff6b35":"#2b5278"}; font-size: 64px; font-weight: bold; margin: 15px 0;">
                                ${e.temperature}°
                            </div>
                            <div class="weather-details" style="color: #555; line-height: 1.8;">
                                <div>🌬️ Ветер: ${e.wind} м/с</div>
                                <div>💧 Влажность: ${e.humidity}%</div>
                                <div>☁️ ${e.condition}</div>
                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e8f0; color: #666; font-style: italic;">
                                    ${(e.desc||"").substring(0,100)}${(e.desc||"").length>100?"...":""}
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0e8f0;">
                            <button class="delete-btn" data-id="${e.id}" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">🗑️ Удалить</button>
                        </div>
                    </div>
                </div>
            `}),t+=`
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#weatherCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#weatherCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
            </div>
        `,i.innerHTML=t,document.querySelectorAll(".weather-card").forEach(e=>{const n=e.closest(".carousel-item"),o=parseInt(n.dataset.cityId);e.addEventListener("click",r=>{r.target.classList.contains("delete-btn")||this.goToCity(o)})}),document.querySelectorAll(".delete-btn").forEach(e=>{e.addEventListener("click",n=>{n.stopPropagation(),this.deleteCity(parseInt(e.dataset.id),n)})}),typeof bootstrap<"u"&&new bootstrap.Carousel(document.getElementById("weatherCarousel"),{interval:!1})}async initSnowflake3D(){setTimeout(async()=>{const i=document.getElementById("snowflake-3d-container");if(!i)return;const t=await Z(()=>import("./three.module-4xNEFFrG.js"),[]),e=new t.Scene;e.background=new t.Color(657962),e.fog=new t.FogExp2(657962,.008);const n=new t.PerspectiveCamera(45,1,.1,1e3);n.position.set(2,2,3),n.lookAt(0,0,0);const o=new t.WebGLRenderer({antialias:!0});o.setSize(280,280),o.setPixelRatio(window.devicePixelRatio),i.innerHTML="",i.appendChild(o.domElement);const r=new t.AmbientLight(4210784);e.add(r);const s=new t.DirectionalLight(16777215,1);s.position.set(1,2,1),e.add(s);const c=new t.DirectionalLight(8956671,.5);c.position.set(-1,1,-1),e.add(c);const y=[16737996,6750156,6737151],v=[];for(let a=0;a<3;a++){const d=new t.PointLight(y[a],.3);d.position.set(Math.sin(a*Math.PI*2/3)*2,1,Math.cos(a*Math.PI*2/3)*2),e.add(d),v.push(d)}const l=new t.Group,w=6,u=1.2;for(let a=0;a<w;a++){const d=a/w*Math.PI*2,f=new t.CylinderGeometry(.03,.08,u,8),X=new t.MeshStandardMaterial({color:8956671,emissive:2254506,emissiveIntensity:.3,metalness:.8,roughness:.2}),g=new t.Mesh(f,X);g.position.x=Math.cos(d)*u/2,g.position.z=Math.sin(d)*u/2,g.rotation.z=d,g.rotation.x=Math.PI/2,l.add(g);for(let T=.3;T<=.7;T+=.2){const F=new t.CylinderGeometry(.02,.04,.2,6),G=new t.MeshStandardMaterial({color:10075135,emissive:3373004,emissiveIntensity:.2,metalness:.7}),h=new t.Mesh(F,G),j=Math.cos(d)*u*T,O=Math.sin(d)*u*T;h.position.x=j,h.position.z=O,h.rotation.z=d+Math.PI/4,h.rotation.x=Math.PI/2,l.add(h);const x=new t.Mesh(F,G);x.position.x=j,x.position.z=O,x.rotation.z=d-Math.PI/4,x.rotation.x=Math.PI/2,l.add(x)}const Y=new t.SphereGeometry(.07,16,16),U=new t.MeshStandardMaterial({color:13426175,emissive:4491485,emissiveIntensity:.4,metalness:.9}),P=new t.Mesh(Y,U);P.position.x=Math.cos(d)*u,P.position.z=Math.sin(d)*u,l.add(P)}const R=new t.IcosahedronGeometry(.15,0),q=new t.MeshStandardMaterial({color:16777215,emissive:6728447,emissiveIntensity:.5,metalness:.95,roughness:.1}),N=new t.Mesh(R,q);l.add(N);for(let a=0;a<12;a++){const d=a/12*Math.PI*2,f=new t.Mesh(new t.DodecahedronGeometry(.05,0),new t.MeshStandardMaterial({color:11193599,emissive:4491468,emissiveIntensity:.3,metalness:.8}));f.position.x=Math.cos(d)*.25,f.position.z=Math.sin(d)*.25,l.add(f)}const H=new t.BufferGeometry,E=new Float32Array(300*3);for(let a=0;a<300;a++)E[a*3]=(Math.random()-.5)*3,E[a*3+1]=(Math.random()-.5)*3,E[a*3+2]=(Math.random()-.5)*3;H.setAttribute("position",new t.BufferAttribute(E,3));const _=new t.PointsMaterial({color:8956671,size:.01,transparent:!0,opacity:.5}),C=new t.Points(H,_);l.add(C),e.add(l);const $=new t.BufferGeometry,k=new Float32Array(800*3);for(let a=0;a<800;a++)k[a*3]=(Math.random()-.5)*200,k[a*3+1]=(Math.random()-.5)*100,k[a*3+2]=(Math.random()-.5)*50-20;$.setAttribute("position",new t.BufferAttribute(k,3));const V=new t.PointsMaterial({color:16777215,size:.08}),S=new t.Points($,V);e.add(S);let L=!1,M={x:0,y:0},z=0,A=0;const I=o.domElement;I.addEventListener("mousedown",a=>{L=!0,M={x:a.clientX,y:a.clientY},I.style.cursor="grabbing"}),window.addEventListener("mousemove",a=>{if(!L)return;const d=a.clientX-M.x,f=a.clientY-M.y;A+=d*.01,z+=f*.01,l.rotation.x=z,l.rotation.y=A,M={x:a.clientX,y:a.clientY}}),window.addEventListener("mouseup",()=>{L=!1,I.style.cursor="grab"}),I.style.cursor="grab";let B=0;function D(){requestAnimationFrame(D),B+=.01,l.children.forEach((a,d)=>{a.isMesh&&a.material&&a.material.emissiveIntensity!==void 0&&(a.material.emissiveIntensity=.3+Math.sin(B+d)*.2)}),v.forEach((a,d)=>{a.intensity=.2+Math.sin(B*2+d)*.15}),C.rotation.y+=.005,C.rotation.x=Math.sin(B*.5)*.1,S.rotation.y+=5e-4,o.render(e,n)}D()},100)}}class et{constructor(i){this.parent=i}render(){this.parent.innerHTML=`
            <div class="calculator-container">
                <div class="content-card" style="max-width: 450px; margin: 0 auto;">
                    <div id="result" class="result">0</div>
                    <div class="buttons-container">
                        <div class="button-row">
                            <button class="my-btn secondary" id="backspace">⌫</button>
                            <button class="my-btn secondary" id="clear">C</button>
                            <button class="my-btn secondary" id="divide">/</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="1">1</button>
                            <button class="my-btn" id="2">2</button>
                            <button class="my-btn" id="3">3</button>
                            <button class="my-btn primary" id="multiply">×</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="4">4</button>
                            <button class="my-btn" id="5">5</button>
                            <button class="my-btn" id="6">6</button>
                            <button class="my-btn primary" id="minus">−</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="7">7</button>
                            <button class="my-btn" id="8">8</button>
                            <button class="my-btn" id="9">9</button>
                            <button class="my-btn primary" id="plus">+</button>
                        </div>
                        <div class="button-row">
                            <button class="my-btn" id="0">0</button>
                            <button class="my-btn" id="dot">.</button>
                            <button class="my-btn primary execute" id="equal">=</button>
                        </div>
                    </div>
                </div>
            </div>
        `,this.initCalculator()}initCalculator(){let i="",t="",e=null;const n=document.getElementById("result");document.querySelectorAll(".my-btn:not(.primary):not(.secondary)").forEach(o=>{const r=o.id;["0","1","2","3","4","5","6","7","8","9","dot"].includes(r)&&(o.onclick=()=>{let s=o.innerHTML;s==="."&&(e?t:i).includes(".")||(e?(t+=s,n.innerHTML=t):(i+=s,n.innerHTML=i))})}),document.getElementById("plus").onclick=()=>{i&&(e="+")},document.getElementById("minus").onclick=()=>{i&&(e="-")},document.getElementById("multiply").onclick=()=>{i&&(e="*")},document.getElementById("divide").onclick=()=>{i&&(e="/")},document.getElementById("clear").onclick=()=>{i="",t="",e=null,n.innerHTML="0"},document.getElementById("backspace").onclick=()=>{e?(t=t.slice(0,-1),n.innerHTML=t||"0"):(i=i.slice(0,-1),n.innerHTML=i||"0")},document.getElementById("equal").onclick=()=>{if(!i||!t||!e)return;let o=parseFloat(i),r=parseFloat(t),s=0;if(e==="+")s=o+r;else if(e==="-")s=o-r;else if(e==="*")s=o*r;else if(e==="/"){if(r===0){alert("На ноль делить нельзя!");return}s=o/r}i=s.toString(),t="",e=null,n.innerHTML=i}}}class it{constructor(i){this.parent=i}render(){this.parent.innerHTML=`
            <div style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
                <div style="max-width: 800px; width: 100%; background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #2b5278 0%, #1a3a5c 100%); color: white; text-align: center; padding: 40px 20px;">
                        <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 50px; margin-bottom: 20px;">👨‍💻</div>
                        <h1 style="font-size: 28px; margin-bottom: 10px;">Левочкин Василий Васильевич</h1>
                        <p style="font-size: 18px; opacity: 0.9;">Группа: ИУ5-46Б</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #2b5278; margin-bottom: 15px;">📚 О проекте</h3>
                            <p style="color: #555; line-height: 1.6;">Сайт выполнен в стиле Gismeteo с использованием современных технологий веб-разработки.</p>
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #2b5278; margin-bottom: 15px;">⚙️ Технологии</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">HTML5</span>
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">CSS3</span>
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">JavaScript ES6+</span>
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">Three.js</span>
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">Bootstrap 5</span>
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">REST API</span>
                                <span style="background: linear-gradient(135deg, #e8f0fe 0%, #d4e4ff 100%); color: #2b5278; padding: 8px 16px; border-radius: 20px;">Fetch API</span>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #2b5278; margin-bottom: 15px;">🌐 Функционал</h3>
                            <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px;">
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">📍 Просмотр погоды в городах России</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">➕ Добавление новых городов</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">✏️ Редактирование данных о погоде</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">🗑️ Удаление городов</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">🔍 Фильтрация по названию города</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">🔥 Фильтр жарких городов (от 20°)</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">❄️ 3D снежинка с эффектами</li>
                                <li style="padding: 8px 12px; background: #f0f7ff; border-radius: 10px;">🧮 Встроенный калькулятор</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 style="color: #2b5278; margin-bottom: 15px;">📡 Работа с API</h3>
                            <p style="color: #555; line-height: 1.6;">Все данные о погоде хранятся на сервере и передаются через REST API с использованием <strong>Fetch API + async/await</strong> (GET, POST, PATCH, DELETE).</p>
                        </div>
                    </div>
                    
                    <div style="background: #f0f7ff; padding: 20px; text-align: center; color: #666; border-top: 1px solid #e0e8f0;">
                        <p>© 2026 Gismeteo | 3D Эффекты | Интерактивная карта погоды</p>
                    </div>
                </div>
            </div>
        `}}class nt{constructor(i,t,e){this.parent=i,this.cityId=t,this.router=e,this.city=null}async fetchCity(){const{data:i,status:t}=await b.get(`${m}/${this.cityId}`);t===200&&i?(this.city=i,this.renderDetail()):(this.parent.innerHTML='<div class="detail-container"><div class="error-card"><h2>😕 Город не найден</h2><button class="back-button" id="backBtn">← Вернуться на главную</button></div></div>',document.getElementById("backBtn").onclick=()=>this.router.navigateToMain())}async updateCity(i){const{data:t,status:e}=await b.patch(`${m}/${this.cityId}`,i);e===200?(this.city=t,this.renderDetail()):alert("Ошибка обновления города")}async deleteCity(){var i;if(confirm(`Удалить город "${(i=this.city)==null?void 0:i.city}"?`)){const{status:t}=await b.delete(`${m}/${this.cityId}`);t===204?this.router.navigateToMain():alert("Ошибка удаления города")}}renderDetail(){if(!this.city)return;const t=parseInt(this.city.temperature)>=20;this.parent.innerHTML=`
            <div class="detail-container" style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
                <div class="detail-card" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 30px; padding: 35px; box-shadow: 0 20px 50px rgba(0,0,0,0.15);">
                    <button class="back-button-detail" id="backBtn" style="background: #2b5278; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; margin-bottom: 25px;">← Назад к списку</button>
                    
                    <div style="text-align: center; margin-bottom: 25px;">
                        <div style="font-size: 60px; margin-bottom: 10px;">🏙️</div>
                        <h1 style="color: #2b5278; font-size: 36px; margin: 0;">${this.city.city}</h1>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 25px;">
                        <div style="color: ${t?"#ff6b35":"#2b5278"}; font-size: 80px; font-weight: bold;">${this.city.temperature}°</div>
                        <div style="color: #666; font-size: 22px; margin-top: 10px;">${this.city.condition}</div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px;">
                        <div style="background: #f0f7ff; border-radius: 15px; padding: 15px; text-align: center;">
                            <div style="font-size: 28px; margin-bottom: 8px;">🌬️</div>
                            <div style="font-size: 12px; color: #666;">Ветер</div>
                            <div style="font-size: 18px; font-weight: bold; color: #333;">${this.city.wind} м/с</div>
                        </div>
                        <div style="background: #f0f7ff; border-radius: 15px; padding: 15px; text-align: center;">
                            <div style="font-size: 28px; margin-bottom: 8px;">💧</div>
                            <div style="font-size: 12px; color: #666;">Влажность</div>
                            <div style="font-size: 18px; font-weight: bold; color: #333;">${this.city.humidity}%</div>
                        </div>
                        <div style="background: #f0f7ff; border-radius: 15px; padding: 15px; text-align: center;">
                            <div style="font-size: 28px; margin-bottom: 8px;">🌡️</div>
                            <div style="font-size: 12px; color: #666;">Ощущается</div>
                            <div style="font-size: 18px; font-weight: bold; color: #333;">${this.city.temperature}°</div>
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; border-radius: 20px; padding: 20px; margin-bottom: 25px;">
                        <h3 style="color: #2b5278; margin: 0 0 10px 0;">📖 Описание</h3>
                        <p style="color: #555; line-height: 1.6; margin: 0;">${this.city.desc||"Описание отсутствует"}</p>
                    </div>
                    
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button id="editBtn" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 30px; cursor: pointer;">✏️ Редактировать</button>
                        <button id="deleteCityBtn" style="background: #dc3545; color: white; border: none; padding: 12px 24px; border-radius: 30px; cursor: pointer;">🗑️ Удалить</button>
                    </div>
                    
                    <div id="editForm" style="display: none; margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 20px;">
                        <h3 style="color: #2b5278; margin: 0 0 15px 0;">✏️ Редактирование</h3>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Температура (°C)</label><input type="number" id="editTemp" value="${this.city.temperature.replace("+","")}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Ветер (м/с)</label><input type="number" id="editWind" value="${this.city.wind}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Влажность (%)</label><input type="number" id="editHumidity" value="${this.city.humidity}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Погодные условия</label><input type="text" id="editCondition" value="${this.city.condition}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Описание</label><textarea id="editDesc" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">${this.city.desc||""}</textarea></div>
                        <div style="display: flex; gap: 10px;"><button id="saveEditBtn" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">💾 Сохранить</button><button id="cancelEditBtn" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">❌ Отмена</button></div>
                    </div>
                </div>
            </div>
        `,document.getElementById("backBtn").onclick=()=>this.router.navigateToMain();const e=document.getElementById("editBtn"),n=document.getElementById("editForm");e.onclick=()=>{n.style.display=n.style.display==="none"?"block":"none"},document.getElementById("saveEditBtn").onclick=async()=>{let o=document.getElementById("editTemp").value;parseFloat(o)>=0&&!o.toString().startsWith("-")&&(o="+"+o);const r={temperature:o,wind:document.getElementById("editWind").value,humidity:document.getElementById("editHumidity").value,condition:document.getElementById("editCondition").value,desc:document.getElementById("editDesc").value};r.wind&&r.humidity&&r.condition?await this.updateCity(r):alert("Заполните все поля!")},document.getElementById("cancelEditBtn").onclick=()=>{n.style.display="none"},document.getElementById("deleteCityBtn").onclick=async()=>{await this.deleteCity()}}render(){this.fetchCity()}}class ot{constructor(i){this.root=i;const t=document.getElementById("home-link");t&&(t.onclick=e=>{e.preventDefault(),this.navigateToMain()}),document.querySelectorAll("[data-page]").forEach(e=>{e.onclick=n=>{n.preventDefault();const o=e.dataset.page;o==="calculator"&&this.navigateToCalculator(),o==="about"&&this.navigateToAbout()}})}navigateToMain(){new tt(this.root,this).render()}navigateToCalculator(){new et(this.root).render()}navigateToAbout(){new it(this.root).render()}navigateToWeather(i){new nt(this.root,i,this).render()}}document.addEventListener("DOMContentLoaded",()=>{const p=document.getElementById("app-root");new ot(p).navigateToMain()});
