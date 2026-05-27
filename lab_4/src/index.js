const express = require('express');
const path = require('path');
const cors = require('cors');
const citiesRouter = require('./routes/cities');
const citiesService = require('./services/citiesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/cities.json');
citiesService.init(DATA_FILE_PATH);

// НАСТРОЙКА CORS - разрешаем запросы с любого источника
app.use(cors({
    origin: '*',  // разрешаем запросы с любых доменов и портов
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирование всех запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API маршруты
app.use('/api/cities', citiesRouter);

// Тестовый маршрут для проверки
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!', time: new Date().toISOString() });
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api/cities`);
    console.log(`🧪 Тест: http://localhost:${PORT}/test`);
});