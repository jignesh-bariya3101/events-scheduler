import request from "supertest";
import mongoose from "mongoose";
import { app } from "../src/app";
import { Event } from "../src/models/event";

// Connect to a test database before running tests
beforeAll(async () => {
  const mongoURI =
    "mongod://localhost:27017/eventScheduler";
  await mongoose.connect(mongoURI, {});
});

// Clear the database after each test
afterEach(async () => {
  await Event.deleteMany({});
});

// Disconnect from the database after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
});

describe("Event API", () => {
  it("should create an event", async () => {
    const res = await request(app).post("/api/events").send({
      title: "Test Event",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      recurrence: "daily",
      eventTime: "12:00",
    });

    expect(res.statusCode).toEqual(201 || 400);
    expect(res.body).toHaveProperty("data._id");
  });

  it("should get events", async () => {
    const event = new Event({
      title: "Test Event",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      recurrence: "daily",
      eventTime: "12:00",
    });
    await event.save();

    const res = await request(app).get("/api/events");
    expect(res.statusCode).toEqual(200 || 400);
    expect(res.body);
  });

  // Add more tests for update and delete operations
});
