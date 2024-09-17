const { cartsService, ordersService } = require("../services");
const { fetchCartById, createProductInCart, fetchCarts, modifyCart, removeCartProduct } = cartsService;
const { createOrder, createProductInOrder } = ordersService;


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
        const data = await fetchCarts()
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

const checkoutCart = async (req, res, next) => {
        const cartId = req.user.cart_id 
        const userId = req.user.id 

        const cart = await fetchCartById(userId)
        
        if (!cart.length === 0) {
                res.status(500).send("Cart is empty.")
                next()
        }
        const orderId = await createOrder(userId)
        
        await Promise.all(cart.map(async (item) => {
                await createProductInOrder({
                        order_id : orderId,
                        product_id : item.id,
                        quantity : item.quantity,
                        price : item.price 
                })
                await removeCartProduct({
                        cart_id: cartId,
                        product_id: item.product_id 
                })
        }))
        res.status(201).json({order_id: orderId})
        next()
}


module.exports = {
        syncCartSelf,
        getAllCarts,
        postProductInCartSelf,
        putCartSelf,
        deleteCartProductSelf,
        checkoutCart
}