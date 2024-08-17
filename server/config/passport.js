const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { userService } = require("../services");
const isProduction = process.env.NODE_ENV === "production";


passport.use(
        "local", 
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password", //by default passport set username and password as login field.
        },
        async (username, password, done) => {
                console.log("3")
                const user = await userService.fetchUserEmail(username);
                
                if (!user) {
                        return done(null, false, {message: "Incorrect email or password."})
                }
                if (!user.password) {
                        return done(null, false, {message: "This email address is related to google login. Try login with google."})
                }
                console.log("3.1")
                const match = await bcrypt.compare(password, user.password)
                console.log("3.2")
                if (!match) {
                        return done(null, false, {message: "Incorrect email or password."})
                }
                console.log("3.3")
                return done(null, user, {message: "Log in successfully1111."})
        }
))

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
                                                console.log("7.1 ", token)
                                        }
                                        
                                        return token;
                                }
                        ])
                },
                async (jwtPayload, done) => {
                        try {
                                console.log("7.2: ", jwtPayload)
                                return done(null, jwtPayload.user)
                        } catch (error) {
                                console.log("7.3 ", error)
                                done(error)
                        }
                }
        )
);