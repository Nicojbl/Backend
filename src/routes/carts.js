import { ProductManager } from "../manager/ProductManager.js";
import { Router } from "express";

const router = Router()
const manager = new ProductManager('../files/products.json')



export default router;