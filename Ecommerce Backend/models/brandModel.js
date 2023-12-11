import { Schema, model, ObjectId } from 'mongoose'; // Erase if already required


// Declare the Schema of the Mongo model
var brandSchema = new Schema({
    title: {
        type: String,
        unique: true,
        index: true,
        required: true,
    }
}, {
    timestamps: true
});


module.exports = model('brand', brandSchema);