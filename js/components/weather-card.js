export class WeatherCardComponent {
    constructor(parent, data, onClick) {
        this.parent = parent;
        this.data = data;
        this.onClick = onClick;
    }

    getHTML() {
        return `
            <div class="weather-card" data-id="${this.data.id}">
                <div class="weather-card-header">
                    <h3>${this.data.city}</h3>
                </div>
                <div class="weather-card-body">
                    <div class="temp-now">${this.data.temperature}°</div>
                    <div class="weather-details">
                        <div>🌬️ Ветер: ${this.data.wind} м/с</div>
                        <div>💧 Влажность: ${this.data.humidity}%</div>
                        <div>☁️ ${this.data.condition}</div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const card = this.parent.lastElementChild;
        card.addEventListener('click', () => {
            if (this.onClick) this.onClick(this.data.id);
        });
    }
}