const fs = require("fs");

let arrProd = JSON.parse(fs.readFileSync('productos.txt'));
 

class Contenedor {
    constructor(productos) {
        this.productos = productos;
    }

    save(agregarProducto, agregarPrecio, agregarImg) {
    
        let nroId = 0;
        let productoNuevo = {
            producto: agregarProducto,
            precio: agregarPrecio,
            img: agregarImg
        };
    
        for (let producto of this.productos) {
            if( productoNuevo === undefined ) {
                producto.id = nroId;
                nroId++;
            } else if (producto.id) {
                this.productos.push(productoNuevo);
                producto.id = nroId;
                nroId++;
            } else {
                producto.id = nroId;
                console.log(`El Id del producto agregado es: ${nroId}`)
                nroId++;
            }
        }
    }

    getById(id) {
        console.log(this.productos[id]);
    }
    
    getAll() {
        console.log(this.productos);
    }

    deleteById(id) {
        this.productos.splice(id, 1);
        console.log(`Producto id:1 fue eliminado`);
    }

    deleteAll() {
        this.productos = [];
    }

}


let prod = new Contenedor(arrProd);