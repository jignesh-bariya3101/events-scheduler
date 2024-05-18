import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  redisURL: string;
  nodeEnv: string;
}

const config: Config = {
  port: parseInt(process.env.PORT || "3000", 10),
  mongoURI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/eventScheduler",
  redisURL: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
