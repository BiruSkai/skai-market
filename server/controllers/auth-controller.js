const passport = require("passport");
const jwt = require("jsonwebtoken");
const { getHashedPass } = require("../services/auth_service");
const { userService, cartService } = require("../services");
const { createUser } = userService;
const { cartService } = cartService;



const signupUser = async (req, res, next) => {
        const {username, password, email} = req.body

        const userDb = await fetchUserPersonalData(email, username)
        if (userDb) {
                return res.send("Email or username already exists.")
        }
        const hashedPass = await getHashedPass(password)
        const userdata = {
                username,
                hashedPass,
                email,
                user_role: "customer",
                status: "active"
        }
        const newUser = await createUser(userdata) 
        const newUserId = newUser.data.id
        const newCart = await createCart(newUserId)

        res.json({
                error: newUser.error,
                user_id: newUserId,
                cart_id: newCart.id
        })
        next();
}


module.exports = {
        signupUser
}