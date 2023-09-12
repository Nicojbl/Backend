document.getElementById("addProductToCart").addEventListener("click", (event) => {
    event.preventDefault();
    const prodId = event.target.getAttribute("prodId");
    const cartid = event.target.getAttribute("cartId");
    fetch(`/api/carts/${cartid}/product/${prodId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        console.log("Producto agregado al carrito");
        window.location.replace(`/api/carts/${cartid}`);
      } else {
        console.log("No se pudo agregar el producto al carrito");
      }
    });
  });
  