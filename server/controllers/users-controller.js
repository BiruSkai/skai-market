const { usersService, cartsService } = require("../services")
const { getHashedPass } = require("../services/auth_service")
const { fetchCartById, removeCart } = cartsService
const { fetchUserById, fetchAllUsers, modifyUserSelf, removeUser } = usersService


const getUserSelf = async (req, res, next) => {
        const id = req.user.id // extract id from passport user object
        const user = await fetchUserById(id)
        res.status(200).json(user)
        next()
}

const getAllUsers = async (req, res, next) => {
        const users = await fetchAllUsers()
        res.status(200).json({users})
        next()
}

const putUserSelf = async (req, res, next) => {
        const id = req.user.id // extract id from passport user object
        const { username, password, email, address, city } = req.body
        const hashedPass = await getHashedPass(password)

        const modifiedData = {
                id, username, hashedPass, email, address, city
        }
        
        await modifyUserSelf(modifiedData)
        res.sendStatus(200)
        next()
}

const deleteUser = async (req, res, next) => {
        const { id } = req.params
        const user = await fetchUserById(id)
        const cart = await fetchCartById(id)

        if (cart.length || !user) {
                const error = new Error("Incorrect user or cart is not empty.")
                next(error)
        }

        await removeCart(id)
        await removeUser(id)
        res.status(200).json({message: "User and cart have been deleted."})
        next() 
}


module.exports = {
        getUserSelf,
        getAllUsers,
        putUserSelf,
        deleteUser
}