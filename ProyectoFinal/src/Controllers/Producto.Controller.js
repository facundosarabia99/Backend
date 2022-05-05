const fs = require('fs')
const routeProducto = require('../Routers/ProdRouter')

const productoCtrl = {}
const producto = []
let esAdmin = false

productoCtrl.soloAdmin = (req, res, next) => {
    if (esAdmin) {
        next()
    } else {
        res.status(403).json({error: -1, descripcion: `ruta '${req.originalUrl}' y método ${req.method} no autorizados`})
    }
}

productoCtrl.login = (req,res) => {
    esAdmin = true
    res.sendStatus(200)
}

productoCtrl.logout = (req,res) => {
    esAdmin = false
    res.sendStatus(200)
}

productoCtrl.getAll = (req, res) => {
    res.json(producto)
}

productoCtrl.getOne = (req, res) => {
    const id = parseInt(req.params.id)
    tempProducto = producto[id - 1]
    if(!tempProducto){
        tempProducto = {error: 'producto no encontrado'}
    }
    res.json(tempProducto)
}

productoCtrl.postOne = async (req, res) => {
    if(!producto.length){
        producto.id = 1
    } else{
        producto.id = producto.length + 1
    }
    producto.push(req.body)
    await fs.promises.writeFile('./Pers/Producto.txt', JSON.stringify(producto), 'utf-8')
    console.log(`El id de este producto es ${producto.id}`)
    res.json({status: `producto añadido`})
}

productoCtrl.putOne = async (req, res) => {
    const nuevoProducto = req.body
    const id = parseInt(req.params.id)
    producto[id - 1] = nuevoProducto
    await fs.promises.writeFile('./Pers/Producto.txt', JSON.stringify(producto), 'utf-8')
    res.json({status: `producto actualizado`})
}

productoCtrl.deleteOne = async (req, res) => {
    const id = parseInt(req.params.id)
    producto.splice(id - 1, 1)
    await fs.promises.writeFile('./Pers/Producto.txt', JSON.stringify(producto), 'utf-8')
    res.json({status: `producto eliminado`})
}

module.exports = productoCtrl;
