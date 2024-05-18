import Queue from "bull";
import { IEvent, Event } from "../models/event";
import { processEventJob } from "./eventProcessorService";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const eventQueue = new Queue<IEvent>("eventQueue", REDIS_URL);

// Define a job processor
eventQueue.process(processEventJob);

export const addEventToQueue = async (event: IEvent) => {
  console.log("getCronPattern(event)", getCronPattern(event));

  const addJob = await eventQueue.add(event, {
    repeat: {
      cron: getCronPattern(event),
    },
  });
  console.log("addJob", addJob.opts.jobId);
  await Event.findByIdAndUpdate(
    {
      _id: event._id,
    },
    {
      jobId: addJob.opts.jobId,
    }
  );
};

export const removeEventToQueue = async (event: IEvent) => {
  console.log(await eventQueue.getJob(event.jobId));
  const deleteJob = await eventQueue.removeJobs(event.jobId);
  console.log("deleteJob", deleteJob);
};

// Generate a cron pattern based on event recurrence
const getCronPattern = (event: IEvent) => {
  const { recurrence, eventTime } = event;
  const [hour, minute] = eventTime.split(":").map(Number);

  switch (recurrence) {
    case "daily":
      return `${minute} ${hour} * * *`;
    case "weekly":
      return `${minute} ${hour} * * 0`;
    case "monthly":
      return `${minute} ${hour} 1 * *`;
    case "everyminute":
      return "* * * * *";
    default:
      throw new Error("Invalid recurrence pattern");
  }
};
