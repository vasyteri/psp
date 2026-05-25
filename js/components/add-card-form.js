export class AddCardFormComponent {
    constructor(parent, onAdd) {
        this.parent = parent;
        this.onAdd = onAdd;
    }

    getHTML() {
        return `
            <div class="add-card-form">
                <h4>➕ Добавить новый город</h4>
                <div class="form-group">
                    <input type="text" id="city-name" placeholder="Название города" />
                </div>
                <div class="form-group">
                    <input type="number" id="city-temp" placeholder="Температура (°C)" />
                </div>
                <div class="form-group">
                    <input type="number" id="city-wind" placeholder="Скорость ветра (м/с)" />
                </div>
                <div class="form-group">
                    <input type="number" id="city-humidity" placeholder="Влажность (%)" />
                </div>
                <div class="form-group">
                    <input type="text" id="city-condition" placeholder="Погодные условия" />
                </div>
                <button class="add-card-btn" id="add-card-btn">Добавить город</button>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        document.getElementById('add-card-btn').addEventListener('click', () => {
            const city = document.getElementById('city-name').value;
            let temp = document.getElementById('city-temp').value;
            const wind = document.getElementById('city-wind').value;
            const humidity = document.getElementById('city-humidity').value;
            const condition = document.getElementById('city-condition').value;
            
            if (city && temp && wind && humidity && condition) {
                if (!temp.toString().startsWith('-') && parseFloat(temp) >= 0) {
                    temp = '+' + temp;
                }
                
                this.onAdd({
                    city: city,
                    temperature: temp,
                    wind: wind,
                    humidity: humidity,
                    condition: condition,
                    desc: 'Новый город'
                });
                
                document.getElementById('city-name').value = '';
                document.getElementById('city-temp').value = '';
                document.getElementById('city-wind').value = '';
                document.getElementById('city-humidity').value = '';
                document.getElementById('city-condition').value = '';
            } else {
                alert('Пожалуйста, заполните все поля!');
            }
        });
    }
}