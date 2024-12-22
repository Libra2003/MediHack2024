/**
 * @fileoverview This file defines the routes for user-related operations in the application.
 * It includes routes for updating, deleting, retrieving a single user, and retrieving all users.
 * The routes are protected by middleware functions to verify admin privileges.
*/
import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/usercontroller.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

/**
 * Express router to mount user-related functions on.
 * @type {import('express').Router}
*/
const router = express.Router();

/**
 * Route to update a user by ID.
 * @name put/:id
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
*/
router.put("/:id",  verifyAdmin, updateUser);

/**
 * Route to delete a user by ID.
 * @name delete/:id
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
*/
router.delete("/:id",  verifyAdmin, deleteUser);

/**
 * Route to get a user by ID.
 * @name get/:id
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
*/
router.get("/:id",  verifyAdmin, getUser);

/**
 * Route to get all users.
 * @name get/
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
*/
router.get("/", verifyAdmin, getAllUser);

export default router;
