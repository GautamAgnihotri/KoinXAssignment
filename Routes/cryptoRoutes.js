import express from "express";
import { getCryptoStats,getCryptoDeviation } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/stats", getCryptoStats);

router.get("/deviation", getCryptoDeviation);

export default router;