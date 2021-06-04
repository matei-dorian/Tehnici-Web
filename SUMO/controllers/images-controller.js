const readJSONFile = require('../utils/readJSONFiles');
const fs = require('fs');

const getImages = (req, res) => {
    const images = readJSONFile('./db/images.json');
    res.send(images);
}


exports.getImages = getImages;