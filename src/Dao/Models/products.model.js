import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductCollection = "products";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
});

ProductSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(ProductCollection, ProductSchema);

export default productModel;
