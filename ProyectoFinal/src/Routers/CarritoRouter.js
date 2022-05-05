const {Router} = require('express')

const {createOne, postOne, getOne, deleteProduct, deleteCart} = require('../Controllers/Carrito.Controller')

const routerCarrito = Router()

routerCarrito.route('/')
    .post(createOne)

routerCarrito.route('/:id/productos/:id_prod')
    .post(postOne)

routerCarrito.route('/:id/productos')
    .get(getOne)

routerCarrito.route('/:id')
    .delete(deleteCart)

module.exports = routerCarrito;