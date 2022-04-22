const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const handlebarsConfig = {
    extname: 'hbs',
    defaultlayout: 'index.hbs'
}
app.engine('hbs', exphbs(handlebarsConfig))

app.set('views', './views')

app.get('/', (req, res) => {
    res.render('datos.hbs', {
        nombre: 'Facundo',
        apellido: 'Rodriguez',
        edad: 15,
        email: 'asdj@hotmail.com',
        telefono: '402949025'
    })
})

app.listen(8080)