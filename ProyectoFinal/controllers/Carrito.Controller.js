const fs = require('fs')
const routerCarrito = require('../routes/RouterCarrito')
const producto = require('./Productos.Controller')

const carritoCtrl = {}
const carrito = []
let tempProd = [];

carritoCtrl.createOne = async (req, res) => {
    if (!carrito.length) {
        carrito.id = 1
    } else {
        carrito.id = carrito.length + 1
    }
    res.json({status: `carrito creado`, id: `${carrito.id}`})
}

carritoCtrl.postOne = async (req, res) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)
    tempProd = await fs.promises.readFile('./Pers/Productos.txt', 'utf-8')
    tempProd = JSON.parse(tempProd)
    tempProd = tempProd.splice(id_prod - 1, 1)
    carrito.push(tempProd)
    await fs.promises.writeFile('./Pers/Carrito.txt', JSON.stringify({id: `${id}`, productos: carrito}), 'utf-8')
    res.json({status: `producto añadido al carrito`})
}

carritoCtrl.getOne = async (req, res) => {
    const id = parseInt(req.params.id)
    let carritoTemp = await fs.promises.readFile('./Pers/Carrito.txt', 'utf-8')
    carritoTemp = JSON.parse(carritoTemp)
    res.json(carritoTemp.productos)
}


carritoCtrl.deleteCart = async (req,res) => {
    const id = parseInt(req.params.id)
    let carritoTemp = await fs.promises.readFile('./Pers/Carrito.txt', 'utf-8')
    carritoTemp = JSON.parse(carritoTemp)
    carritoTemp.productos = []
    await fs.promises.writeFile('./Pers/Carrito.txt',JSON.stringify(carritoTemp) , 'utf-8')
    res.json({status: `carrito borrado exitosamente`})
}

module.exports = carritoCtrl;