const passport = require("passport");
const jwt = require("jsonwebtoken");
const { userService, cartService, authService } = require("../services");
const { getHashedPass } = authService;
const { createUser, fetchUserEmail } = userService;
const { createCart } = cartService;



const signupUser = async (req, res, next) => {
        const {email, username, password, address, city} = req.body
        
        const userDb = await fetchUserEmail(email, username)
        if (userDb) {
                return res.send("Email or username already exists.")
        }
        const hashedPass = await getHashedPass(password)
        const userdata = {
                email,
                username,
                hashedPass,
                address,
                city,
                user_role: "customer",
                active: true
        }
        const newUser = await createUser(userdata) 
        const newUserId = newUser.id
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