const { newMainAdvertisementDb } = require("../db")


const createMainAdvertisement = async (userInput) => {
        
        return await newMainAdvertisementDb(userInput)
}


module.exports = {
        createMainAdvertisement
}