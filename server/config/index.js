require("dotenv").config({path:"../.env"})
const {Pool} = require("pg")
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.USER}:${process.env.PASS}@${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`;


const pool = new Pool({
        connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = {
        port: parseInt((process.env.EXPRESS_PORT)),
        pool
};