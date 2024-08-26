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


module.exports = {
        syncCartSelf,
}