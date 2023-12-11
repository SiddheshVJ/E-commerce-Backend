import { Schema, model } from "mongoose";

let couponSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    expiry: {
        type: Date,
        required: true,
    },
    discount: {
        type: Number,
        required: true
    }
})

module.exports = model('Coupon', couponSchema)