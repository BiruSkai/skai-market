const passport = require("passport");
const bcrypt = require("bcrypt");
const JWTStrategy = require("pasport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { userService } = require("../services")


passport.use("locale", 
        new LocalStrategy({
                usernameField: "email",
                passwordField: "password", //by default passport set username and password as login field.
        },
        async (email, password, done) => {
                const user = await userService.fetchUserEmail(email);
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
                return done(null, user, {message: "Log in successfully."})
        }
))