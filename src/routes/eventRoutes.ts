import express from "express";
import {
  createEvent,
  getEvents,
  findById,
  remove,
  update,
} from "../controllers/eventController";
import { validateEvent } from "../utils/validation";

const router = express.Router();

router.post("/events", validateEvent, createEvent);
router.get("/events", getEvents);
router.get("/events/:id", findById);
router.put("/events/:id", update);
router.delete("/events/:id", remove);

// Add more routes for update and delete

export default router;
