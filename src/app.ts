import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes";
import "./services/queueService"; // Initialize the queue
import config from "./config/config"; // Import configuration

const app = express();

app.use(bodyParser.json());

app.use("/api", eventRoutes);

mongoose
  .connect(config.mongoURI, {})
  .then(() =>
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    )
  )
  .catch((err) => console.log(err));

export { app }; // Export the app instance
