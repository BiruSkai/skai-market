const passport = require("passport");
const jwt = require("jsonwebtoken");
const { userService, cartService, authService } = require("../services");
const { validationResult } = require("express-validator");
const { getHashedPass } = authService;
const { createUser, fetchUserEmail } = userService;
const { createCart } = cartService;
const isProduction = process.env.NODE_ENV === "production";


const signupUser = async (req, res, next) => {
        const {email, username, password, address, city} = req.body
        
        const userDb = await fetchUserEmail(email, username)

        if (userDb?.active === true) {

                return res.status(403).send("Email or username already exists.")
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

        res.status(201).json({
                error: newUser.error,
                user_id: newUserId,
                cart_id: newCart.id
        })
        next();
}

const loginUser = async (req, res, next) => {
        // Reject if validation fails
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
                return res.status(422).json({errors:errors.array()})
        }
        
        passport.authenticate(
                "local",
                async (error, user, info) => {
                        if (error || !user) {
                                const errMsg = new Error(info.message)
                                next(errMsg);
                        }
                        req.login(
                                user,
                                {session: false},
                                async (error) => {
                                        if (error) return next(error)
                                        console.log("auth-contr: ", user)
                                        const body = {id:user.id, cart_id:user.cart_id, email:user.email, role:user.user_role};
                                        const token = jwt.sign({user:body}, process.env.JWT_KEY);
                                        console.log("5 ", token)
                                        res.cookie("JWT", token, {
                                                maxAge: 1000 * 60 * 60,
                                                httpOnly: true, // A cookie with the HttpOnly attribute is blocked from JavaScript and only is included in requests to the domain.
                                                sameSite: isProduction ? none : "lax",
                                                secure: isProduction ? true : false, // cookie sent only in https if true (adding security)
                                                
                                        })
                                        console.log("6", req.cookies["JWT"])
                                        return res.status(200).send("Login successful.");
                                }
                        );
                }) (req, res, next)
};

const logoutUser = (res, req, next) => {
        console.log(req-cookies)
        res.clearCookie("JWT", {
                maxAge: 1000 * 60 * 60,
                httpOnly: true, 
                sameSite: isProduction ? none : "lax",
                secure: isProduction ? true : false
                
        })
        res.status(200).send()

     
}


module.exports = {
        signupUser,
        loginUser,
        logoutUser
}