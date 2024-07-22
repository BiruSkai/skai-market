const { createMainAdvertisement } = require("../services/admin_service")


const newMainAdvertisement = async (req, res, next) => {
        const {imageAd, title, description} = req.body

        const userInput = {
                imageAd, title, description, user_id:1
        }

        const data = await createMainAdvertisement(userInput)
        return res.json({
                data
        })
}


module.exports = {
        newMainAdvertisement
}