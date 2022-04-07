const express = require('expresss')

const app = express()

let contadorVisitas = 0

app.get('/', (req,res) => {
    res.send(`
<h1> Desafio Express</h1>
<p>Esto es un texto</p>
<a href="/visitas">visitas</a>
`)
})

app.get('/pagina', (req,res) => {
    res.sendFile(process.cwd()+ '/index.html')
})

app.get('/visitas', (req,res) => {
    res.send(`Sitio visitado ${contadorVisitas ++} veces`)
})

app.get('/saludos', (req,res) => {
    res.send('Saludos')
})

app.get('/saludos/llegada', (req,res) => {
    res.send('hola mundo')
})

app.get('/saludos/salida', (req,res) => {
    //console.log(req.url)
    res.send('chau mundo')
})

app.get('/fyh', (req,res) => {
    const fecha = new Date()
    const fechaStr = fecha.toLocaleDateString()
    res.send({
       fyh: fechaStr 
    })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log (`Error en el servidor ${error}`))
