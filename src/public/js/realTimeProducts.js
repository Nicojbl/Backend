const socket = io()

const addProduct = document.getElementById('addProduct');
const delProduct = document.getElementById('delProduct')

addProduct.addEventListener("click", (evt) => {
    if (evt) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let code = document.getElementById('code').value;
    let price = document.getElementById('price').value;
    let stock = document.getElementById('stock').value;
    let category = document.getElementById('category').value;

    const newProducto = {
        title,
        description,
        price,
        code,
        stock,
        category,
    };

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('code').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('category').value = '';

    socket.emit("addProduct", newProducto);
    }
});

socket.on("actualizado", products => {
    let listaProductos = document.getElementById('products');
        listaProductos.innerHTML = '<h1>Lista de productos</h1>'; 
    products.forEach(product => {
    let p = document.createElement('p');
        p.innerText = `title: ${product.title}, description: ${product.description}, code: ${product.code}, price: ${product.price}, stock: ${product.stock}, category: ${product.category}, id: ${product.id}, `;
        listaProductos.appendChild(p);
    });
});

delProduct.addEventListener("click", (evt) => {
    if(evt) {
        const id = document.getElementById('id').value;
        document.getElementById('id').value = '';
        socket.emit("delProduct", id)
    }
})