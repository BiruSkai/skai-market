const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({path:"../.env"})
const cors_rules = {
        origin: process.env.CORS_ORIGIN,
        credentials: true
}
const app = express();
const routes = require("./routes")
const config = require("./config")
const passport = require("passport")
require("./config/passport")


app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser()) // enable cookie

app.use(cors(cors_rules))
app.options("*", cors(cors_rules))

app.use(express.json()) // take req.body from json 
app.use(express.urlencoded({extended:true})) // take req.body from form
app.use(passport.initialize()) // passport will be init on every route request

app.use("/api", routes) // append 'routes' to '/api'

// handling error on each route request
app.use((error, req, res, next) => {
        res.status(error.status || 500).send({
                error: {
                        status: error.status || 500,
                        message: error.message || "Internal server error"
                }
        })
})

app.listen(config.port, () => {
        console.log(`Server is listening to port: ${config.port}.`)
})