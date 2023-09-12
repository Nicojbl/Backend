import productModel from "../../Models/products.model.js";
import userModel from "../../Models/user.model.js";
import { CustomError } from "../../../services/errors/customError.js";
import { EError } from "../../../services/errors/enums.js";
import { DirectoryErrors } from "../../../services/errors/info.js";
import { transporter } from "../../../config/gmail.js"

const directoryErrors = new DirectoryErrors();

class ProductManager {
  async addProduct(_product) {
    const product = {
      title: _product.title,
      description: _product.description,
      price: _product.price,
      stock: _product.stock,
      category: _product.category,
      owner: _product.owner,
    };

    try {
      await productModel.create(product);
      return {
        code: 202,
        status: "Success",
        message: `El producto ${product.title} ha sido agregado con exito.`,
      };
    } catch (error) {
      return {
        code: 400,
        status: "Error",
        message: `${error}`,
      };
    }
  }

  async renderProducts(req, res) {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort || "";
    const query = req.query.query || "";

    JSON.stringify(req.session.user, null, "\t");

    let products;

    if (limit === 10 && page === 1 && sort === "" && query === "") {
      // Renderizar la página sin parámetros de consulta
      products = await productModel.find().lean();
      res.render("products", {
        products,
        user: req.session.user,
      });
    } else {
      const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } =
        await productModel.paginate(
          { category: query },
          { limit, page, sort: { price: sort }, lean: true }
        );
      products = docs;

      if (page > totalPages || totalPages <= 0 || isNaN(page)) {
        // Retornar un mensaje de error si se proporciona un número de página inexistente
        return res.status(400).send("Número de página no válido");
      }

      res.render("products", {
        user: req.session.user,
        admin: req.session.admin,
        products,
        page,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        limit,
        sort,
        query,
      });
    }
  }

  async getProducts() {
    const products = await productModel.find();

    if (!products) {
      req.logger.error("Error! productos no encontrados");
    }

    return products;
  }

  async getProductByID(pid, req) {
    try {
      const product = await productModel.findById(pid).lean();
      if (!product) {
        CustomError.createError({
          name: "Get product id error",
          cause: directoryErrors.ProductErrorId(pid),
          message: "Error intentando obtener el producto con la id ingresada",
          errorCode: EError.INVALID_PARAM,
        });
      }
      return product;
    } catch (error) {
      req.logger.error("Error!!" + JSON.stringify(error, null, "\t"));
    }
  }

  async updateProductStock(productId, newStock) {
    try {
      const product = await productModel.findById(productId);
      if (!product) {
        return { success: false, message: "Producto no encontrado" };
      }

      // Actualizar el stock del producto con el nuevo valor
      product.stock = newStock;

      // Guardar los cambios en la base de datos
      await product.save();

      return product;
    } catch (error) {
      return {
        success: false,
        message: "Error al actualizar el stock del producto",
      };
    }
  }

  async deleteProduct(pid, res) {
    const prod = await productModel.findById(pid)
    const deleteProd = await productModel.deleteOne({ _id: pid });
    if (!deleteProd) {
      return {
        code: 400,
        status: "Error",
        message: "No se ha encontrado un product con ese ID",
      };
    }
    const userId = prod.owner;
    const user = await userModel.findById(userId);
    if (user.rolPremium) {
      try {
        await transporter.sendMail({
          from: "ecommerce E-Bikes",
          to: "bassonicolasnjbl@gmail.com",
          subject: "Producto eliminado con exito",
          html: `<div>
          <h1>Hola biker!</h1>
          <p>Eliminamos un producto que has agregado anteriormente</p>
      </div>`,
        });
        res.send({
          status: "success",
          menssage: "Producto de usuario premium eliminado",
        });
      } catch (e) {
        res.send({
          status: "Error",
          menssage: "no se pudo eliminar el producto de usuario premium",
        });
      }
    }
  }
}

export default ProductManager;
