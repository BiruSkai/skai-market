const passport = require("passport");
const jwt = require("jsonwebtoken");
const { usersService, cartsService, authService } = require("../services");
const { validationResult } = require("express-validator");
const { getHashedPass } = authService;
const { createUser, fetchUserEmail } = usersService;
const { createCart } = cartsService;
const isProduction = process.env.NODE_ENV === "production";


const signupUser = async (req, res, next) => {
        const {email, username, password, address, city} = req.body
        console.log("contr1: ", email)
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
                active: true,
                google_id:null
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
                                        
                                        res.cookie("JWT", token, {
                                                maxAge: 1000 * 60 * 60,
                                                httpOnly: true, // A cookie with the HttpOnly attribute is blocked from JavaScript and only is included in requests to the domain.
                                                sameSite: isProduction ? none : "lax",
                                                secure: isProduction ? true : false, // cookie sent only in https if true (adding security)
                                                
                                        })

                                        return res.status(200).send("Login successful.");
                                }
                        );
                }) (req, res, next)
};

const loginGoogle = async (req, res, next) => {
        const user = req.user
        const body = {id: user.id, cart_id: user.cart_id, email: user.email, role: user.user_role}
        const token = jwt.sign({ user: body }, process.env.JWT_KEY)

        res.cookie("JWT", token, {
                maxAge: 1000 * 60 * 60,
                httpyOnly: true,
                sameSite: isProduction ? null : "lax",
                secure: isProduction ? true : false
        })

        return res      .status(200)
                        .redirect(isProduction ? 
                                process.env.GOOGL_FRONT_END_REDIRECT_URL :
                                "http://localhost:3000/google-login")
}

const logoutUser = (req, res, next) => {
        
        if (req.cookies["JWT"]) {
                res.clearCookie("JWT", {
                        httpOnly: true,
                        sameSite: isProduction ? none : "lax",
                        secure: isProduction ? true : false
                })
        }
        return res.sendStatus(200)
}


module.exports = {
        signupUser,
        loginUser,
        logoutUser, 
        loginGoogle
}