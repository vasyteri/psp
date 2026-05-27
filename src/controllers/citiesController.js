const citiesService = require('../services/citiesService');

const getAllCities = (req, res) => {
    const { city } = req.query;
    const cities = citiesService.findAll(city);
    res.json(cities);
};

const getCityById = (req, res) => {
    const id = parseInt(req.params.id);
    const city = citiesService.findOne(id);
    
    if (!city) {
        return res.status(404).json({ error: 'Город не найден' });
    }
    
    res.json(city);
};

const createCity = (req, res) => {
    const { city, temperature, wind, humidity, condition, desc } = req.body;
    
    if (!city || !temperature || !wind || !humidity || !condition) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newCity = citiesService.create({ city, temperature, wind, humidity, condition, desc: desc || '' });
    res.status(201).json(newCity);
};

const updateCity = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCity = citiesService.update(id, req.body);
    
    if (!updatedCity) {
        return res.status(404).json({ error: 'Город не найден' });
    }
    
    res.json(updatedCity);
};

const deleteCity = (req, res) => {
    const id = parseInt(req.params.id);
    const success = citiesService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Город не найден' });
    }
    
    res.status(204).send();
};

module.exports = {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
};