class AboutPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
            <div class="content-card" style="text-align: center;">
                <h2 style="color: #2b5278;">Об авторе</h2>
                <div style="margin-top: 20px; line-height: 1.8;">
                    <p><strong>Группа:</strong> ИУ5-46Б</p>
                    <p><strong>Студент:</strong> Левочкин Василий Васильевич</p>
                    <div style="margin-top: 20px; padding: 15px; background: #f0f7ff; border-radius: 10px;">
                        <p>🌐 Сайт выполнен в стиле Gismeteo</p>
                        <p>📍 Можно добавлять и удалять города</p>
                        <p>💾 Данные сохраняются в браузере</p>
                        <p>❄️ 3D снежинка с возможностью вращения</p>
                    </div>
                </div>
            </div>
        `;
    }
}