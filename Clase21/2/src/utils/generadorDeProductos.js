import faker from 'faker'
faker.locale = 'es'

function generarProductos(id) {
  return {
    id,
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    image: faker.image.avatar(),
  }
}

export { generarProductos }