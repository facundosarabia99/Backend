import express from "express";
import cart from "../models/cart.model.js";
import mongoose from "mongoose";
import transporter from "../utils/mailTransport.js";

const date = new Date();

export async function checkoutByCartId(req,res){
    try{
        const CartById = await cart.findOne({_id: req.params.id})
        console.log(req.user);
        try{
            const mailOptions = {
                from: "facundosarabia15@gmail.com",
                to: "facundosarabia15@gmail.com",
                subject: `New request from ${req.user.firstName} ${req.user.lastName}, ${req.user.email}`,
                html: `
                <h1>Payment Information<h1>
                ${CartById.products.map((producto) => {
                    return `
                    <div>
                    <h3>Producto: ${producto.title}</h3>
                    <h4>Precio: ${producto.price}</h4>
                    <h5>Stock: ${producto.stock}</h5>
                    </div>`; 
                })} html:
                `,
            };
            const respone = await transporter.sendMail(mailOptions);

            loggers.info("Email sent to registered user");
        } catch (error){
            console.log("Error sending email to user");
        }
        return res.status(200).json({success: true, msg: "Purchase successfull", data: CartById})
        } catch(error) {
            console.log(`Cart Id ${req.params.id} doesn't exists`);
            return res
                .status(404)
                .json({success: false, message: "Error creating cart", error: JSON.stringify(error)});
    }
}