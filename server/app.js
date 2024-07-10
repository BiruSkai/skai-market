const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const app = express();


app.use(helmet())
app.use(morgan("dev"))