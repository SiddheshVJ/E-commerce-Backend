import { Schema, model, ObjectId } from 'mongoose'; // Erase if already required


// Declare the Schema of the Mongo model
var categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, {
    timestamps: true
});


module.exports = model('ProductCategory', categorySchema);