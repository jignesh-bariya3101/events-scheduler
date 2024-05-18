import { Job } from 'bull';
import { IEvent } from '../models/event';

export const processEventJob = async (job: Job<IEvent>) => {
  const event = job.data;
  
  console.log(`Processing event: ${event.title}`);
  // Add your event processing logic here
};
