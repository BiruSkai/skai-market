const { cartsService } = require("../services");
const { fetchCartById } = cartsService;


// get cartDbById, if new productId not there, add them to the cart
const syncCartSelf = async (req, res, next) => {
        const userId = req.user.id // from passport
        const cartId = req.user.cart_id // from passport
        const dbCart = await fetchCartById(userId)

        const loggedOutCart = req.body.cart

        for (const productId in loggedOutCart) {
                if (!dbCart.some(item => item.product.id === productId)) {
                        const cartProduct = {
                                cart_id: cartId,
                                product_id: productId,
                                quantity: loggedOutCart[productId].quantity
                        }
                        await createProductInCart(cartProduct)
                }
        }
        const newCart = await fetchCartById(userId)
        res.status(200).json(newCart)
        next()
}

const getAllCarts = async (req, res, next) => {
        const data = await fetchAllCarts()
        res.status(200).json(data)
        next()
}

const postProductInCartSelf = async (req, res, next) => {
        const { product_id, quantity } = req.body
        const cartId = req.user.cart_id 

        const cartProduct = { 
                product_id, 
                cart_id: cartId, 
                quantity 
        }

        await createProductInCart(cartProduct)
        res.sendStatus(201)
        next() 
}

const putCartSelf = async (req, res, next) => {
        const { product_id, quantity } = req.body 
        const cartId = req.user.cart_id 

        const updateCartProduct = {
                product_id,
                quantity,
                cart_id: cartId
        }

        const newCart = await modifyCart(updateCartProduct)
        res.status(200).json(newCart)
        next()

}

const deleteCartProductSelf = async (req, res, next) => {
        const cartId = req.user.cart_id 
        const { product_id } = req.body 

        const cartProduct = { 
                cart_id: cartId, 
                product_id
        }

        const deleted = await removeCartProduct(cartProduct)
        res.status(200).json(deleted)
        next()
}


module.exports = {
        syncCartSelf,
        getAllCarts,
        postProductInCartSelf,
        putCartSelf,
        deleteCartProductSelf,

}