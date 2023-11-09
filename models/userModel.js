import { Schema, model, ObjectId } from 'mongoose'; // Erase if already required
import bcrypt from 'bcrypt'

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Array,
        default: []
    },
    address: [{ type: ObjectId, ref: "Address" }],
    wishList: [{ type: ObjectId, ref: "Product" }],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Export the model
module.exports = model('User', userSchema);