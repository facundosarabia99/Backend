/*const { count } = require("console");*/

class Usuario{
    constructor(nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }



getFullName(){
    console.log(`${this.nombre} ${this.apellido}`);
}

addMascota(masc){
    this.mascotas.push(masc);
}

countMascotas(){
    console.log(this.mascotas.length);
}

addbook(nombre, autor){
    this.libros.push({nombre: nombre, autor: autor});
}

getBookNames(){
    const arrayNombresLibros = [];
    for ( const cadaLibro in this.libros){
        arrayNombresLibros.push(this.libros[cadaLibro]['nombre'])
    }
    console.log(arrayNombresLibros);
    }

}

/*const Usuario = new Usuario ('Facundo', 'Sarabia', 10, 'Perro y Gato')*/


console.log(Usuario)