import ContenedorMemoria from '../contenedores/ContenedorMemoria.js'
import { generarProducto } from '../utils/generadorDeProductos'
import { generarId } from '../utils/generadorDeIds.js'

class ApiProductosMock extends ContenedorMemoria {
    constructor() { super() }

    popular(cant = 50) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoProducto = generarProducto(generarId())
            const guardado = this.guardar(nuevoProducto)
            nuevos.push(guardado)
        }
        return nuevos
    }
}

export default ApiProductosMock