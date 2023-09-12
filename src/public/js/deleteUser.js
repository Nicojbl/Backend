document.querySelectorAll(".deleteUser").forEach((rol) => {
    rol.addEventListener("click", (event) => {
      event.preventDefault();
      const userId = rol.getAttribute("userId");
      fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Rol de usuario cambiado");
            window.location.replace("/api/users");
          } else {
            console.log("No se pudo cambiar el rol del usuario");
          }
        })
        .catch((error) => {
          console.error("Error en la solicitud fetch:", error);
        });
    });
  });
  