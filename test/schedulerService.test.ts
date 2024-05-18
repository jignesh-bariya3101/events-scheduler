import Queue from "bull";
import { scheduleEvent } from "../src/services/schedulerService";
import { Event, IEvent } from "../src/models/event";

describe("Scheduler Service", () => {
  let queue: any;

  beforeEach(() => {
    // Create a mock instance of the Bull queue
    queue = new Queue("test-queue");

    // Mock the add method of the queue
    queue.add = jest.fn();
  });

  afterEach(() => {
    // Clear all mock calls after each test
    jest.clearAllMocks();
  });

  it("should schedule an event job", async () => {
    // Create a mock event object
    const event = {
      title: "Test Event",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      recurrence: "daily",
      eventTime: "12:00",
    } as IEvent;

    // Call the function to schedule the event
    await scheduleEvent(queue, event);

    // Verify that the queue.add method was called with the correct arguments
    expect(queue.add).toHaveBeenCalledWith(
      "eventJob",
      { event },
      {
        repeat: { cron: "0 12 * * *" }, // Adjust based on your scheduling logic
      }
    );
  });
});
