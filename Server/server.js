/**
 * @fileoverview This file sets up an Express server with MongoDB connection, 
 * middleware configuration, and route definitions for authentication and user management.
 * It also includes error handling middleware and starts the server on a specified port.
 * 
 * Dependencies:
 * - express: Fast, unopinionated, minimalist web framework for Node.js
 * - dotenv: Loads environment variables from a .env file into process.env
 * - mongoose: MongoDB object modeling tool designed to work in an asynchronous environment
 * - cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names
 * - cors: Middleware to enable Cross-Origin Resource Sharing (CORS)
 * 
 * Routes:
 * - /api/auth: Handles authentication-related requests
 * - /api/user: Handles user-related requests
 * 
 * Environment Variables:
 * - MONGO: MongoDB connection string
 * - PORT: Port number for the server to listen on (default: 8080)
 * 
 * Event Listeners:
 * - MongoDB connection events for logging connection status
 * 
 * Middleware:
 * - CORS
 * - Cookie Parser
 * - JSON body parser
 * - Error handling
 * 
 * Functions:
 * - connect: Asynchronously connects to MongoDB and logs the connection status
 * - Error handling middleware: Handles errors and sends JSON response with error details
 * 
 * Server:
 * - Starts the Express server and connects to MongoDB
*/
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

// Importing routes
import authRoute from "./routes/authroute.js";
import userRoute from "./routes/userroute.js";

// Initialize Express application and configure Dotenv middleware
const app = express();
dotenv.config();

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Logs a message on successful connection or throws an error on failure.
 * @async
 * @function connect
 * @returns {Promise<void>}
*/
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Initial connection to MongoDB successful!");
    } catch(err) {
        throw (err);
    }
};

// MongoDB connection event listeners
mongoose.connection.on("disconnected", () => {
    console.log("Error: MongoDB disconnected on timestamp: (", Date(), ")!");
});
mongoose.connection.on("connected", () => {
    console.log("Message: MongoDB connected on timestamp: (", Date(), ")!");
});

// Enabling middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Defining routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

/**
 * Error handling middleware for the Express application.
 * @function
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} JSON response with error details.
*/
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    });
});

/**
 * Starts the Express server and connects to MongoDB.
 * @function
 * @param {number} [port=8080] - The port number to start the server on.
*/
app.listen(process.env.PORT || 8080, () => {
    connect();
    console.log(`Server started on port ${process.env.PORT || 8080}`);
});
