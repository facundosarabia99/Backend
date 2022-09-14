import Order from '../models/order.model.js'
import transporter from "../utils/mailTransport.js";

export async function createOrder(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Must enter order to create",
    });
  }
  const orderNumber = await Order.estimatedDocumentCount()
  console.log(orderNumber)
  const order = new Order({
    email: body.email,
    status: body.status,
    order_number: orderNumber === 0 ? 1 : orderNumber + 1,
    items: body.items,
    address: body.address,
  });
  if (!order) {
    return res.status(400).json({ success: false, error: "Missing Fields" });
  }
  order
    .save()
    .then(() => {
      try {
        const mailOptions = {
          from: "facundosarabia15@gmail.com",
          to: "facundosarabia15@gmail.com",
          subject: "New purchase order",
          html: `
        <h1>Purchase information</h1>
        <span>Email: ${body.email}</span>
        <span>Oreder number: ${orderNumber === 0 ? 1 : orderNumber + 1}</span>
        <span>Adress: ${body.address}</span>
        
        <span>Items: ${body.items}</span>
        `,
        };
        transporter.sendMail(mailOptions);
        console.info("Mail of new purchase has been sent");
      } catch (error) {
        console.fatal("Error sending email to user");
      }
      return res.status(201).json({
        success: true,
        id: order._id,
        message: "Order created succsessfully",
      });
    })
    .catch((error) => {
      console.log(error)
      return res.status(400).json({
        error,
        message: "Error, order not created",
      });
    });
}
export async function listarOrders(req, res) {
  await Order.find({})
    .then((ordenes) => {
      if (!ordenes.length) {
        return res
          .status(404)
          .json({ success: false, error: "Orders not found" });
      }
      return res.status(200).json(ordenes);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    });
}

export async function deleteOrder(req, res) {
  const body = req.body;
  await Order.findOneAndDelete({ _id: req.params.id })
    .then((orden) => {
      if (!body) {
        return res.status(400).json({
          success: false,
          error: "Must enter order to delete",
        });
      }
      return res.json({
        success: true,
        message: `Order Id ${req.params.id} deleted`,
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        error: "-2",
        descripcion: `Order Id ${req.params.id} not found`,
      });
    });
}