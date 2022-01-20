const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    productID: Number,
    productName: String,
    stock: Number,
    category:Array,
    productType: String,
    price: Number,
    discount: Number,
    image:String
})
const Inventory = mongoose.model("product", ProductSchema);

module.exports = Inventory;