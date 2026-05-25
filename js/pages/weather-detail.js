import { ajax, API_BASE } from '../api.js';

export class WeatherDetailPage {
    constructor(parent, cityId, router) {
        this.parent = parent;
        this.cityId = cityId;
        this.router = router;
        this.city = null;
    }

    fetchCity() {
        ajax.get(`${API_BASE}/${this.cityId}`, (data, status) => {
            if (status === 200 && data) {
                this.city = data;
                this.renderDetail();
            } else {
                this.parent.innerHTML = `<div class="detail-container"><div class="error-card"><h2>😕 Город не найден</h2><button class="back-button" id="backBtn">← Вернуться на главную</button></div></div>`;
                document.getElementById('backBtn').onclick = () => this.router.navigateToMain();
            }
        });
    }

    updateCity(updatedData) {
        ajax.patch(`${API_BASE}/${this.cityId}`, updatedData, (data, status) => {
            if (status === 200) {
                this.city = data;
                this.renderDetail();
            } else {
                alert('Ошибка обновления города');
            }
        });
    }

    deleteCity() {
        if (confirm(`Удалить город "${this.city?.city}"?`)) {
            ajax.delete(`${API_BASE}/${this.cityId}`, (data, status) => {
                if (status === 204) {
                    this.router.navigateToMain();
                } else {
                    alert('Ошибка удаления города');
                }
            });
        }
    }

    renderDetail() {
        if (!this.city) return;
        
        const tempValue = parseInt(this.city.temperature);
        const isHot = tempValue >= 20;
        
        this.parent.innerHTML = `
            <div class="detail-container" style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
                <div class="detail-card" style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 30px; padding: 35px; box-shadow: 0 20px 50px rgba(0,0,0,0.15);">
                    <button class="back-button-detail" id="backBtn" style="background: #2b5278; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer; margin-bottom: 25px;">← Назад к списку</button>
                    
                    <div style="text-align: center; margin-bottom: 25px;">
                        <div style="font-size: 60px; margin-bottom: 10px;">🏙️</div>
                        <h1 style="color: #2b5278; font-size: 36px; margin: 0;">${this.city.city}</h1>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 25px;">
                        <div style="color: ${isHot ? '#ff6b35' : '#2b5278'}; font-size: 80px; font-weight: bold;">${this.city.temperature}°</div>
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
                        <p style="color: #555; line-height: 1.6; margin: 0;">${this.city.desc || 'Описание отсутствует'}</p>
                    </div>
                    
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button id="editBtn" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 30px; cursor: pointer;">✏️ Редактировать</button>
                        <button id="deleteCityBtn" style="background: #dc3545; color: white; border: none; padding: 12px 24px; border-radius: 30px; cursor: pointer;">🗑️ Удалить</button>
                    </div>
                    
                    <div id="editForm" style="display: none; margin-top: 25px; padding: 20px; background: #f8f9fa; border-radius: 20px;">
                        <h3 style="color: #2b5278; margin: 0 0 15px 0;">✏️ Редактирование</h3>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Температура (°C)</label><input type="number" id="editTemp" value="${this.city.temperature.replace('+', '')}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Ветер (м/с)</label><input type="number" id="editWind" value="${this.city.wind}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Влажность (%)</label><input type="number" id="editHumidity" value="${this.city.humidity}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Погодные условия</label><input type="text" id="editCondition" value="${this.city.condition}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;"></div>
                        <div style="margin-bottom: 15px;"><label style="display: block; margin-bottom: 5px;">Описание</label><textarea id="editDesc" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">${this.city.desc || ''}</textarea></div>
                        <div style="display: flex; gap: 10px;"><button id="saveEditBtn" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">💾 Сохранить</button><button id="cancelEditBtn" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">❌ Отмена</button></div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('backBtn').onclick = () => this.router.navigateToMain();
        document.getElementById('deleteCityBtn').onclick = () => this.deleteCity();
        
        const editBtn = document.getElementById('editBtn');
        const editForm = document.getElementById('editForm');
        editBtn.onclick = () => { editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none'; };
        
        document.getElementById('saveEditBtn').onclick = () => {
            let newTemp = document.getElementById('editTemp').value;
            if (parseFloat(newTemp) >= 0 && !newTemp.toString().startsWith('-')) newTemp = '+' + newTemp;
            const newData = {
                temperature: newTemp,
                wind: document.getElementById('editWind').value,
                humidity: document.getElementById('editHumidity').value,
                condition: document.getElementById('editCondition').value,
                desc: document.getElementById('editDesc').value
            };
            if (newData.wind && newData.humidity && newData.condition) this.updateCity(newData);
            else alert('Заполните все поля!');
        };
        
        document.getElementById('cancelEditBtn').onclick = () => { editForm.style.display = 'none'; };
    }
    
    render() {
        this.fetchCity();
    }
}