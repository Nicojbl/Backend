import { EError } from "../../services/errors/enums.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.ROUTING_ERROR:
      res.json({ status: "Error", message: error.message });
      break;
    case EError.DATABASE_ERROR:
      res.json({ status: "Error", message: error.message });
      break;
    case EError.INVALID_JSON:
      res.json({ status: "Error", message: error.message });
      break;
    case EError.AUTH_ERROR:
      res.json({ status: "Error", message: error.message });
      break;
    case EError.INVALID_PARAM:
      res.json({ status: "Error", message: error.message });
      break;
    case EError.INVALID_TYPES_ERROR:
      res.json({ status: "Error", message: error.message });
      break;

    default:
        res.json({ status: "Error", message: "Hubo un error inesperado :(, Contactate con el equipo de soporte." });
      break;
  }
  next()
};
