const { usersService, cartsService } = require("../services")
const { fetchUserById } = usersService


const getUserSelf = async (req, res, next) => {
        const id = req.user.id // extract id from passport user object
        const user = await fetchUserById(id)
        res.status(200).json(user)
        next()
}

module.exports = {
        getUserSelf
}