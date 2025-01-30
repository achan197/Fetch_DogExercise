import express from "express";
import { getDogs, getMatch } from "../controllers/DogController.js";

const router = express.Router();

router.get("/", getDogs);
router.get("/:id", getMatch);

export default router;
