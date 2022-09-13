import Mensaje from "../models/mesnajes.model.js";
const date = new Date();

export function createMensajes(req, res){
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Muste enter category to create",
        });
    }
    const mensaje = new Mensaje(body);
    if (!mensaje){
        return res.status(400).json({ success: false, error: "Missing fields"});
    }
    mensaje
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: mensaje._id,
                message: "Message created",
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: "Error, fail to create message"
            });
        });
}
export async function listarMensajes(req, res){
    await Mensaje.find({})
    .then((mensajes) => {
        if(!mensajes.length) {
            return res
            .status(404)
            .json({ success: false, error: "Messages not found"});
        }
        return res.status(200).json(mensajes);
    })
    .catch((err) => {
        return res.status(400).json({ success: false, error: err});
    });
}
export async function listarMensajesByEmail(req, res) {
    await Mensaje.find({ email: req.body.email})
    .then((mensajes) => {
      if (!mensajes.length) {
        return res
          .status(404)
          .json({ success: false, error: "No se encontraron mensajes de este email" });
      }
      return res.status(200).json(mensajes);
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
  }