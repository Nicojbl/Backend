class productManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

    getProductById(idProduct) {
        let product = this.products.find((prod) => prod.id == idProduct)

        if(product) {
            return product
        } else {
            return console.log('Not found')
        }
    }

    addProducts(title, description, price, thumbnail, code, stock){
        let idProduct = this.getProducts().length;

        let product = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ++idProduct
        }

        if (!product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock) {
            return console.log('debe ingresar todos los campos solicitados')
        } else if(isNaN(product.price)) {
            return console.log('debe incregar un numero como precio')
        } else if(isNaN(product.stock)) {
            return console.log('debe ingresar un numero como stock')
        }

        let codigo = this.products.find((prod) => prod.code == product.code)
        if (codigo) {
            return console.log('El codigo ya ha sido ingresado anteriormente, ingrese otro')
        }
        this.products.push(product)
        return this.products
    }
}

const ProductManager = new productManager();
ProductManager.addProducts('Monopatin', 'rapido', '1400', 'asdasd', '43245', '50')
ProductManager.addProducts('MonopatinXL', 'duradero', '1000', 'aassdasd', '4334dsd', '30')


console.log(ProductManager.getProductById(1))