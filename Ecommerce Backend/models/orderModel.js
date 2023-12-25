import { Schema, model } from "mongoose";

let orderSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            count: Number,
            color: String
        }
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Cash On Delivery", "Processing", "Dispatched", "Cancelled", "Delivered"]
    },
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)

module.exports = model('Order', orderSchema)