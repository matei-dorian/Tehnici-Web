const readJSONFile = require('../utils/readJSONFiles');
const fs = require('fs');

const getFood = (req, res) => {
    const food = readJSONFile('./db/food.json');
    res.send(food);
}


exports.getFood = getFood;