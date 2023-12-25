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
        unique: true,
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
        default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Ftwowritingteachers.files.wordpress.com%2F2015%2F05%2Fblogging.jpg&tbnid=GH8pUu8ZIXj-TM&vet=12ahUKEwioidDeg7-CAxUM5zgGHWwBA-sQMygjegUIARC8AQ..i&imgrefurl=https%3A%2F%2Ftwowritingteachers.org%2F2015%2F06%2F08%2Fblogging-adventures%2F&docid=lksS8orJsSy-XM&w=500&h=326&q=blog%20images&ved=2ahUKEwioidDeg7-CAxUM5zgGHWwBA-sQMygjegUIARC8AQ"
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