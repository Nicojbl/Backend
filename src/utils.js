import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { Faker, en } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validatePassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// faker-js
const customFaker = new Faker({
  locale: [en],
});
const { commerce, database, string, lorem } = customFaker;
const newProduct = () => {
  return {
    _id: database.mongodbObjectId(),
    title: commerce.productName(),
    description: lorem.paragraph(),
    price: parseFloat(commerce.price()),
    stock: parseInt(string.numeric(2)),
    category: lorem.sentence(),
  };
};

export const generateProducts = () => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    const product = newProduct();
    products.push(product);
  }
  return products;
};

export default __dirname;
