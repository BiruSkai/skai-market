const { check, validationResult } = require("express-validator");


const validateFormMainAdvertisement = [
        check("imageAd").not().isEmpty(),
        check("title").not().isEmpty().isLength({max:20}),
        check("description").not().isEmpty().isLength({max:50}),
        (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors:errors.array()})
                }
                next();
        }
]

const validateNewUser = [
        check("email").not().isEmpty().isEmail().isLength({max:35}),
        check("username").not().isEmpty().isLength({max:10}),
        check("password").not().isEmpty().isLength({min:5, max:12}),
        check("address").not().isEmpty().isLength({max:25}),
        check("city").not().isEmpty().isLength({max:15}),
        
        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validateLogin = [
        check("email").not().isEmpty().isLength({max:35}),
        check("password").not().isEmpty().isLength({min:5, max:12}),
        
        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validateGetProducts = [
        check("id").not().isEmpty().isInt(),

        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validatePostProduct = [
        check("title").not().isEmpty().isLength({max:15}),
        check("price").not().isEmpty(),
        check("quantity").not().isEmpty().isInt(),
        check("category").not().isEmpty().isLength({max:15}),
        check("description").not().isEmpty().isLength({max:50}),
        check("img_url").not().isEmpty(),
        check("status").not().isEmpty().isLength({max:15}),
        
        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validatePutProduct = [
        check("id").not().isEmpty().isInt(),
        check("title").not().isEmpty().isLength({max:15}),
        check("price").not().isEmpty(),
        check("quantity").not().isEmpty().isInt(),
        check("category").not().isEmpty().isLength({max:15}),
        check("description").not().isEmpty().isLength({max:50}),
        check("img_url").not().isEmpty(),
        check("status").not().isEmpty().isLength({max:50}),
        
        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validateDeleteProduct = [
        check("id").not().isEmpty().isInt(),
        
        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validatePutUser = [
        check("username").not().isEmpty().isLength({max:10}),
        check("password").not().isEmpty(),
        check("email").not().isEmpty().isLength({max:35}),
        check("address").not().isEmpty().isLength({max:25}),
        check("city").not().isEmpty().isLength({max:15}),

        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next()
        }
]

const validateDeleteUser = [
        check("id").not().isEmpty().isInt(),

        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next()
        }
]

const validateCart = [
        check("id").not().isEmpty().isInt(),

        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validateDeleteCartProduct = [
        check("product_id").not().isEmpty().isInt(),

        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]

const validateOrder = [
        check("order_id").not().isEmpty().isInt(),

        (req, res, next) => {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                        return res.status(422).json({errors: errors.array()})
                }
                else next();
        }
]


module.exports = {
        validateFormMainAdvertisement, validateNewUser, validateLogin, validatePutUser, validateDeleteUser,
        validateGetProducts, validatePostProduct, validatePutProduct, validateDeleteProduct,
        validateCart, validateDeleteCartProduct, validateOrder
}