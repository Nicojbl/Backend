import { Router } from "express";

const router = Router();

router.get("/loggerTest", (req, res) => {
  // en consola por que son de desarrollo
    req.logger.fatal("Error!!");
    req.logger.error("Error!!");
    req.logger.warn("Error!!");
    req.logger.info("Error!!");
    req.logger.http("Error!!");
    req.logger.verbose("Error!!");
    req.logger.debug("Error!!");
    req.logger.silly("este no se ve!");
  // en path por que son de produccion
//   req.logger.fatal("Error!!");
//   req.logger.error("Error!!");
//   req.logger.warn("Error!!");
//   req.logger.info("Error!!");
//   req.logger.http("este no se ve!");
//   req.logger.verbose("este no se ve!");
//   req.logger.debug("este no se ve!");
//   req.logger.silly("este no se ve!");
  res.send("probando logger");
});

export default router;
