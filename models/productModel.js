import { Schema, model } from "mongoose";

let productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0,
        select: false
    },
    images: {
        type: Array
    },
    color: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    ratings: [
        {
            star: Number,
            comment: String,
            postedBy: { type: Schema.Types.ObjectId, ref: "User" }
        }
    ],
    totalRatings: {
        type: String,
        default: 0
    }
},
    { timestamps: true })

module.exports = model('Product', productSchema)