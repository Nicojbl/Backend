document.querySelectorAll(".deleteUser").forEach((del) => {
    del.addEventListener("click", (event) => {
      event.preventDefault();
      const userId = del.getAttribute("userId");
      fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("usuario eliminado");
            window.location.replace("/api/users");
          } else {
            console.log("No se pudo eliminar el user");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud fetch:", error);
        });
    });
  });
  