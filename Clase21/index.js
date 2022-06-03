import { faker } from '@faker-js/faker';
faker.locale = 'es'
import { writeFile } from 'fs'

const randomProduct = faker.commerce.product();
const randomPrice = faker.commerce.price();
const randomImage = faker.image.fashion();


for (let i = 0; i < 100; i++) {
    str += randomProduct +
        ';' + randomPrice +
        ';' + randomImage +
        '\n'
}

writeFile('/api/productos-test.csv', str, err => {
    if (err) console.log(err);
    console.log('archivo guardado')
})




const PORT = 8080
const srv = app.listen(PORT, () => {
    console.log(`Servidor Http Mocking escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))