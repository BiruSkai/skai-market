const { adminService } = require("../service").
const { createMainAdvertisement, getAllMainAdvertisement } = adminService


const newMainAdvertisement = async (req, res, next) => {
        const {imageAd, title, description} = req.body

        const userInput = {
                imageAd, title, description, user_id:1
        }

        const data = await createMainAdvertisement(userInput)
        console.log("admin-contr-createAd: ", data)
        return res.json({
                data
        })
}

const fetchAllMainAdvertisement = async (req, res, next) => {
        const data = await getAllMainAdvertisement
        console.log("admin-contr-fetchAllAd: ", data)
        return data
}


module.exports = {
        newMainAdvertisement,
        fetchAllMainAdvertisement,
}