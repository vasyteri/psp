const express = require('express');
const path = require('path');
const cors = require('cors'); // добавьте: npm install cors
const citiesRouter = require('./routes/cities');
const citiesService = require('./services/citiesService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/cities.json');
citiesService.init(DATA_FILE_PATH);

// Middleware
app.use(cors()); // для поддержки CORS (фронтенд может быть на другом порту)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Маршруты API
app.use('/api/cities', citiesRouter);

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
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