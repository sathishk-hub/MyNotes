import { Router } from "express";
import * as helper from "../utils/helper.js";

const router = Router();

/* GET home page. */
router.get("/", (_req, res) => {
  res.json(
    helper.getStandardResponse({
      status: true,
      message: null,
      data: { title: "sathish" },
    })
  );
});

export default router;
