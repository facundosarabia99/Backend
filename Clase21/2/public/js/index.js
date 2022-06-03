const socket = io() // apunta al localhost:8080

const agregarProducto = document.getElementById('agregarProducto');
agregarProducto.addEventListener('submit', e => {
    
    e.preventDefault()

    const producto = {
        title: agregarProducto[0].value,
        price: agregarProducto[1].value,
        thumbnail: agregarProducto[2].value
    }

    socket.emit('update', producto);

    agregarProducto.reset()
});

socket.on('productos', productos);

async function productos(productos){

    const buscarPlantilla = await fetch('plantilla/plantillaProductos.hbs')

    const respuesta = await buscarPlantilla.text()

    const template = Handlebars.compile(respuesta)

    const html = template({ productos })

    document.getElementById('productos').innerHTML = html 
};






//--------------------------------------------------------\\

function mostrarMensajes(mensajes) {
    const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
        return `<li style="color:brown;" [${fecha}] - style="color:blue;"><b> ${autor}:</b> style="color:green;"><i>${texto}</i></li>`
    })

    const mensajesHtml = `
<ul>
${mensajesParaMostrar.join('<br>')}
</ul>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml
}

socket.on('mensajesActualizados', mensajes => {
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputAutor')
    const inputMensaje = document.getElementById('inputMensaje')
    if (inputAutor.value && inputMensaje.value) {
        const mensaje = {
            autor: inputAutor.value,
            texto: inputMensaje.value
        }
        socket.emit('nuevoMensaje', mensaje)
    } else {
        alert('Ingrese algún mensaje')
    }
})