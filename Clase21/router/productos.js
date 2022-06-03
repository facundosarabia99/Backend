import { Router } from 'express'
import ApiproductosMock from '../api/productos'

const apiproductos = new ApiproductosMock()

const router = Router()

router.post('/popular', async (req, res, next) => {
    try {
        res.json(await apiproductos.popular(req.query.cant))
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.json(await apiproductos.listarAll())
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await apiproductos.listar(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        res.json(await apiproductos.guardar(req.body))
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        res.json(await apiproductos.actualizar({ ...req.body, id: req.params.id }))
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await apiproductos.borrar(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    const erroresNoEncontrado = [
        'Error al listar: elemento no encontrado',
        'Error al actualizar: elemento no encontrado',
        'Error al borrar: elemento no encontrado'
    ]

    if (erroresNoEncontrado.includes(err.message)) {
        res.status(404)
    } else {
        res.status(500)
    }
    res.json({ message: err.message })
})

export default router