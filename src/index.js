const express = require('express');
const path = require('path');
const cors = require('cors');
const citiesRouter = require('./routes/cities');
const citiesService = require('./services/citiesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/cities.json');
citiesService.init(DATA_FILE_PATH);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Раздача статики из папки public (собранный фронтенд)
app.use(express.static(path.join(__dirname, '../public')));

// API маршруты
app.use('/api/cities', citiesRouter);

// Все остальные GET-запросы отдаем index.html (для SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Обработка 404 для API
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API маршрут не найден' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`API доступен по адресу http://localhost:${PORT}/api/cities`);
});