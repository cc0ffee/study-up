import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allLocations, getLocationsMeta, getSingleLocation } from "../controllers/locationController.js";

export const router = express.Router()

// router.use(authMiddleware);

// gets all spots
router.get("/", allLocations);

router.get("/meta", getLocationsMeta);

router.get("/:id", getSingleLocation);

export default router;