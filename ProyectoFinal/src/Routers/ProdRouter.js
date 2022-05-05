const {Router} = require('express')

const {login, logout, soloAdmin, getAll, getOne, postOne, putOne, deleteOne} = require('../Controllers/Productos.Controller')

const routerProducto = Router()

routerProducto.route('/login')
    .get(login)

routerProductoo.route('/logout')
    .get(logout)
    
routerProducto.route('/')
    .get(getAll)
    .post(soloAdmin, postOne);

routerProducto.route('/:id')
    .get(getOne)
    .put(soloAdmin, putOne)
    .delete(soloAdmin, deleteOne)

module.exports = routerProducto;