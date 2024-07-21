const { createMainAdvertisement } = require("../services/admin_service")


const newMainAdvertisement = async (req, res, next) => {
        const {imageAd, title, description} = req.body

        const data = {
                imageAd, title, description, user_id:1
        }
        console.log("admin-contr1: ", data.title)

        const newAdvertisement = await createMainAdvertisement(data)
        console.log("admin-contr: ", newAdvertisement)
        return res.json({
                newAdvertisement: newAdvertisement
        })
}


module.exports = {
        newMainAdvertisement
}