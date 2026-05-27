const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (city) => {
    const cities = fileService.readData(dataFilePath);
    if (city) {
        return cities.filter(c => 
            c.city.toLowerCase().includes(city.toLowerCase())
        );
    }
    return cities;
};

const findOne = (id) => {
    const cities = fileService.readData(dataFilePath);
    return cities.find(city => city.id === id);
};

const create = (cityData) => {
    const cities = fileService.readData(dataFilePath);
    
    const newId = cities.length > 0 
        ? Math.max(...cities.map(c => c.id)) + 1 
        : 1;
        
    const newCity = { id: newId, ...cityData };
    cities.push(newCity);
    fileService.writeData(dataFilePath, cities);
    
    return newCity;
};

const update = (id, cityData) => {
    const cities = fileService.readData(dataFilePath);
    const index = cities.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    cities[index] = { ...cities[index], ...cityData };
    fileService.writeData(dataFilePath, cities);
    
    return cities[index];
};

const remove = (id) => {
    const cities = fileService.readData(dataFilePath);
    const filteredCities = cities.filter(c => c.id !== id);
    
    if (filteredCities.length === cities.length) {
        return false;
    }
    
    fileService.writeData(dataFilePath, filteredCities);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };