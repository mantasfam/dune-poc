const { Router } = require("express");

import * as controllers from "../../controllers/v1/";
import { getChartMiddleware } from "../../middlewares/v1/getChart.middleware";
import { getChartJsMiddleware } from "../../middlewares/v1/getChartJs.middleware";

const router = Router();

router.get("/ping", controllers.healthCheck);

router.get("/chart/:chartId", getChartMiddleware, controllers.getChart);
router.get("/chartJs/:chartId", getChartJsMiddleware, controllers.getChartJs);

// Not found
router.all("*", controllers.notFound);

export default router;
