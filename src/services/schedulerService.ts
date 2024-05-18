import schedule from "node-schedule";
import { Event, IEvent } from "../models/event";
import { Queue } from "bull";

export const scheduleEvent = async (queue: Queue, event: IEvent) => {


  const { startDate, endDate, recurrence, eventTime } = event;
  let rule = new schedule.RecurrenceRule();
  
  // Bull Jobs for Horizontal Stack
  await queue.add(
    "eventJob",
    { event },
    {
      repeat: { cron: "0 12 * * *" }, // Adjust based on your scheduling logic
    }
  );

  switch (recurrence) {
    case "daily":
      rule.hour = parseInt(eventTime.split(":")[0]);
      rule.minute = parseInt(eventTime.split(":")[1]);
      break;
    // Handle weekly and monthly cases
  }

  schedule.scheduleJob(rule, () => {
    if (new Date() >= new Date(startDate) && new Date() <= new Date(endDate)) {
      console.log(`Event ${event.title} is happening now!`);
    }
  });
};
