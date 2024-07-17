const passport = require("passport")
const JWTStrategy = require("pasport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;


passport.use(
        "jwt-admin",
        new JWTStrategy(
                {
                        
                }
        )
)