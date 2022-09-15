import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'
import User from '../models/user.model.js'
import mongoose from 'mongoose'
const date = new Date()

export async function createCart(req, res) {
  const body = req.body;
  const user = req.user
  console.log(user)
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Must enter a product.",
    })
  }
  await Cart.findOne({ user: user }).populate({
    path: "user",
    model: "User",
  }).then((cart) => {
    if (!cart) {
      const carrito = new Cart({ user: user });
      carrito
        .save()
        .then(() => {
          return res
            .status(201)
            .json({ success: true, id: carrito._id, message: "Cart created" });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ error: err, message: "Can't create cart" });
        });
    } else {

      return res
        .status(401)
        .json({ message: "Cart already exists for this user" });
    }
  }).catch((err) => {
    console.log(err)
    return res
      .status(402)
      .json({ error: err, message: "Error creating cart" });
  })
}

export async function listarProductosCartById(req, res) {
  if (!req.params.id) {
    return res
      .status(404)
      .json({ success: false, error: "Must enter Id of cart" });
  }
  await Cart.findOne({ _id: req.params.id })
    .populate({ path: "products.product", model: "Product" })
    .then((carrito) => {
      console.log(carrito);
      return res.status(200).json(carrito);
    });
}
export async function agregarProductosCart(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(404).json({
      success: false,
      error: "Must enter product to add.",
    });
  }
  await Cart.findOne({ _id: req.params.id })
    .populate({ path: "products.product", model: "Product" })
    .then((carrito) => {
      const Producto = {
        _id: new mongoose.Types.ObjectId(),
        product: body.product_id,
        qty: body.qty,
        timestamp: date.toLocaleString("es-AR"),
      };
      if (carrito.products.find((obj) => obj.product.id === body.product_id)) {
        console.log('ENTRA AL IF')
        carrito.products.map((obj) => {
          if (obj.product.id === body.product_id) {
            obj.qty = obj.qty + body.qty
          }
          return obj;
        });
        carrito
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: carrito._id,
              message: `${body.product_id} updated`,
            });
          })

          .catch((err) => {
            return res
              .status(404)
              .json({ err, message: "can't add product." });
          });
      } else {
        console.log("PUSH")
        carrito.products.push(Producto);
        carrito
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: carrito._id,
              message: `${Producto.nombre} added to cart id ${carrito._id}`,
            });
          })

          .catch((err) => {
            return res
              .status(404)
              .json({ err, message: "Can't add product" });
          });
      }


    });
}
export async function deleteCart(req, res) {
  const body = req.body;
  await Cart.findOneAndRemove({ _id: req.params.id })
    .then((carrito) => {
      if (!carrito) {
        return res.status(400).json({
          success: false,
          error: "Impossible to find cart to delete",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Deleted Cart" });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ err, message: "Error to delete cart" });
    });
}
export async function deleteProductosCart(req, res) {
  await Cart.findById({ _id: req.params.id })
    .then((carrito) => {
      const carritoUpdate = carrito.products.filter(
        (products) => products._id != req.params.id_prod
      );
      Cart.findByIdAndUpdate(
        { _id: req.params.id },
        { products: carritoUpdate }
      )
        .then(() => {
          return res
            .status(200)
            .json({ success: true, message: "Product deleted" });
        })
        .catch(() => {
          return res
            .status(402)
            .json({ error: true, message: "Impossible todelete product" });
        });

    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: error, message: "Cart not found" });
    });
}
export async function clearCart(req, res) {
  await Cart.findById({ _id: req.params.id })
    .then((carrito) => {
      const carritoUpdate = []
      Cart.findByIdAndUpdate(
        { _id: req.params.id },
        { products: carritoUpdate }
      )
        .then(() => {
          return res
            .status(200)
            .json({ success: true, message: "Succsesfull to empty cart" });
        })
        .catch(() => {
          return res
            .status(402)
            .json({ error: true, message: "Couldn't empty cart" });
        });

    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: error, message: "Cart not found" });
    });
}
