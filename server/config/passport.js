const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { usersService } = require("../services");
const { addGoogleIdUser } = usersService;
const isProduction = process.env.NODE_ENV === "production";


passport.use(
        "local", 
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password", //by default passport set username and password as login field.
        },
        async (username, password, done) => {
                const user = await usersService.fetchUserEmail(username);
                
                if (!user) {
                        return done(null, false, {message: "Incorrect email or password."})
                }
                if (!user.password) {
                        return done(null, false, {message: "This email address is related to google login. Try login with google."})
                }
                const match = await bcrypt.compare(password, user.password)
                if (!match) {
                        return done(null, false, {message: "Incorrect email or password."})
                }
                return done(null, user, {message: "Log in successfully1111."})
        }
))

passport.use(
        "google",
        new GoogleStrategy({
                clientID: process.env.GOOGL_CLIENT_ID,
                clientSecret: process.env.GOOGL_CLIENT_SECRET,
                callbackURL: isProduction ? process.env.GOOGL_CALLBACK_URL : "http://localhost:3001/api/auth/google/redirect"
        },
        async (accessToken, refreshToken, profile, cb) => {
                const googleUser = await fetchUserByGoogleId(profile.id)
                if (googleUser) {
                        return cb(null, googleUser, {message: "user found."})
                } else {
                        // Check if user email and status active exist in db, then add google_id
                        const userDb = await fetchUserByEmailDb(profile.emails[0].value)
                        if (userDb?.active) {
                                const googleUser = {
                                        id: userDb.id,
                                        google_id: profile.id
                                }
                                const newGoogleUser = await addGoogleIdUser(googleUser)
                                return cb(null, newGoogleUser, {message: "Google login added to user."})
                        }

                        const user = {
                                email: profile.email[0].value,
                                google_id: profile.id,
                                username: profile.name.givenName + "." + profile.name.familyName,
                                user_role: "customer"
                        }

                        const newUser = await createUser(user)
                        const newCart = await createCart(newUser.id)
                        newUser.cart_id = newCart.id // Attach cart_id to newUser object sothat it can appear in JWT cookie on first login.
                        console.log("passport google: ", newUser)
                        return cb(null, newUser, {message: "New user created."})
                }
        })
)

// Check the JWT cookie
passport.use(
        "jwt-customer",
        new JWTStrategy(
                {
                        secretOrKey: process.env.JWT_KEY,
                        jwtFromRequest: ExtractJWT.fromExtractors([
                                (req) => {
                                        let token = null;
                                        if (req && req.cookies) {
                                                token = req.cookies["JWT"]
                                        }
                                        
                                        return token;
                                }
                        ])
                },
                async (jwtPayload, done) => {
                        try {
                                return done(null, jwtPayload.user)
                        } catch (error) {
                                done(error)
                        }
                }
        )
);

passport.use(
        "jwt-admin",
        new JWTStrategy(
                {
                        secretOrKey: process.env.JWT_KEY,
                        jwtFromRequest: ExtractJWT.fromExtractors([
                                (req) => {
                                        let token= null
                                        if (req && req.cookies) {
                                                token= req.cookies["JWT"]
                                        } 
                                        
                                        return token
                                }
                        ])
                },
                async (jwtPayload, done) => {
                        if (jwtPayload.user.role !== "admin") { // Reject if not admin
                                return done(null, false) 
                        } 
                        try {
                                return done(null, jwtPayload.user)
                        } catch (error) {
                                done(error)
                        }
                }
        )
);