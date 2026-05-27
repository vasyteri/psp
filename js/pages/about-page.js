class AboutPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
                <div style="max-width: 1125px; width: 100%; background: white; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; overflow: hidden;">
                    
                    <div style="background: linear-gradient(135deg, #2b5278 0%, #1a3a5c 100%); padding: 25px;">
                        <h2 style="color: white; margin: 0; font-size: 28px;">Об авторе</h2>
                    </div>
                    
                    <div style="padding: 30px;">
                        <p style="margin: 0 0 10px 0; font-size: 18px;"><strong>Группа:</strong> ИУ5-46Б</p>
                        <p style="margin: 0 0 25px 0; font-size: 18px;"><strong>Студент:</strong> Левочкин Василий Васильевич</p>
                        
                        <div style="background: #f0f7ff; border-radius: 15px; padding: 25px;">
                            <p style="margin: 0 0 12px 0; font-size: 17px;">🌐 Сайт выполнен в стиле Gismeteo</p>
                            <p style="margin: 0 0 12px 0; font-size: 17px;">📍 Можно добавлять и удалять города</p>
                            <p style="margin: 0 0 12px 0; font-size: 17px;">💾 Данные сохраняются в браузере</p>
                            <p style="margin: 0; font-size: 17px;">❄️ 3D снежинка с возможностью вращения</p>
                        </div>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 12px; border-top: 1px solid #e0e8f0;">
                        <p style="color: #666; font-size: 13px; margin: 0;">© 2001–2026 Gismeteo | 3D Эффекты</p>
                    </div>
                </div>
            </div>
        `;
    }
}