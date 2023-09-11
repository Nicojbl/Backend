import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  owner: String,
});

ProductSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, ProductSchema);

export default productModel;
