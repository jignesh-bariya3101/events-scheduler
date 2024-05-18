import { Request, Response } from "express";
import { Event, IEvent } from "../models/event";
import { addEventToQueue, removeEventToQueue } from "../services/queueService";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const checkTitle = await Event.findOne({ title: req.body.title });
    if (checkTitle) {
      return res.status(400).json({
        success: false,
        data: {},
        message: "Event title already exists.",
      });
    }
    const createEvent = await Event.create(req.body);
    console.log("createEvent", createEvent);
    await addEventToQueue(createEvent);
    res.status(201).json({
      success: true,
      data: createEvent,
      message: "Event created successfully.",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      success: true,
      data: events,
      message: "Event list fetched.",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const events = await Event.findOne({ _id: req.params.id });
    if (events) {
      return res.status(200).json({
        success: true,
        data: events,
        message: "Event details fetched.",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: events,
        message: "Event not found with provided id",
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const events = await Event.findOne({ _id: req.params.id });
    if (events) {
      const updateEvent = await Event.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: true,
        data: updateEvent,
        message: "Event updated successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: events,
        message: "Event not found with provided id",
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const events = await Event.findOne({ _id: req.params.id });
    if (events) {
      const removeEvent = await Event.findOneAndDelete({
        _id: req.params.id,
      });
      await removeEventToQueue(events);
      return res.status(200).json({
        success: true,
        data: removeEvent?._id,
        message: "Event deleted successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: events,
        message: "Event not found with provided id",
      });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
// Add more handlers for update and delete
