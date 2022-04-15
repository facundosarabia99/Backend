const { date } = require('assert-plus')

const fs = require('fs')

let arrProd = JSON.parse(fs.readFileSync('productos.txt'));

let ultimoId = 0

class Caja{
    constructor(ruta){
        this.ruta = ruta
        this.cosas = []
    }
    async guardar(cosa){
        cosa.id = ultimoId + 1
        this.cosas.push(cosa)
        await fs.promises.writeFile(this.ruta, JSON.stringify(this.cosas))
        ultimoId++
    }
    getById(id) {
        console.log(this.products);
    }
    deleteById(id) {
        this.products.splice(id,1);
        console.log(`Product id: 1 fue eliminado`);
    }
    deleteAll(){
        this.products = [];
    }
}

let prod = new Caja(arrProd);

/* const Caja = new Caja()

const cosa = {
    nombre: 'regla',
    precio: 150
}

Caja.guardar(cosa)*/