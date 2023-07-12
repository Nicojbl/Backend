export class DirectoryErrors {
  UserErrorInfo = (user) => {
    return `
        Alguno/s campos para crear el usuario no es valido:
        Lista de los campos requeridos:
        first_name: Debe ser un campo string, pero recibio ${user.first_name}
        Last_name: Debe ser un campo string, pero recibio ${user.last_name}
        age: Debe ser un campo number, pero recibio ${user.age}
        email: Debe ser un campo string, pero recibio ${user.email}
        `;
  };

  ProductErrorId = (prodId) => {
    return `
        Este producto id no existe en nuestra base de datos: ${prodId}
        `;
  };
}
