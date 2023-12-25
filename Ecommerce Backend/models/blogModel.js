import { Schema, model, ObjectId } from 'mongoose'; // Erase if already required


// Declare the Schema of the Mongo model
var blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisLiked: {
        type: Boolean,
        default: false
    },
    images: [],
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    disLikes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    image: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        default: "Admin"
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});


module.exports = model('Blog', blogSchema);