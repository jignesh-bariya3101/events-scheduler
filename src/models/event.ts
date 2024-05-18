import { Schema, model, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  recurrence: "daily" | "weekly" | "monthly" | "everyminute";
  eventTime: string;
  jobId: string;
}

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  recurrence: { type: String, required: true },
  eventTime: { type: String, required: true },
  jobId: { type: String, required: false },
});

export const Event = model<IEvent>("Event", eventSchema);
