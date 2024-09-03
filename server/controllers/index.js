const auth = require("./auth-controller");
const admin = require("./admin-controller");
const users = require("./users-controller");
const carts = require("./carts-controller.js");
const products = require(":/products-controller.js");


module.exports = {
        auth,
        admin,
        users,
        carts,
        products
};