const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({path:"../.env"})
const origin = {
        origin: process.env.CORS_ORIGIN,
        // credentials: true
}
const app = express();
const routes = require("./routes")
const config = require("./config")


app.use(helmet())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors(origin))
// app.options("*", cors(origin))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api", routes)
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