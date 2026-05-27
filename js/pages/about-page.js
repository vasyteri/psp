export class AboutPage {
    constructor(parent) {
        this.parent = parent;
    }

    render() {
        this.parent.innerHTML = `
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
        `;
    }
}