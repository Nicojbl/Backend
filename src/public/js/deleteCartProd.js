document.querySelectorAll(".deleteCartProd").forEach((del) => {
    del.addEventListener("click", (event) => {
      event.preventDefault();
      const cartId = del.getAttribute("cartId");
      const prodId = del.getAttribute("prodId");
      fetch(`/api/carts/${cartId}/product/${prodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Producto eliminado del carrito");
            window.location.replace(`/api/carts/${cartId}`);
          } else {
            console.log("No se pudo eliminar el producto del carrito");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud fetch:", error);
        });
    });
  });
  