/**
 * @fileoverview This file defines the routes for user-related operations in the application.
 * It includes routes for updating, deleting, retrieving a single user, and retrieving all users.
 * The routes are protected by middleware functions to verify admin privileges.
*/
import express from "express";
import { deleteUser, getAllUser, getUser, updateUser, updateBadges, updateCourses, claimRewards } from "../controllers/usercontroller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

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

/**
 * Route to update badges for a user by ID.
 * @name put/badges/:id
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
 * @param {function} updateBadges - Controller function to handle the request
*/
router.put("/badges/:id", updateBadges);

/**
 * Route to update courses for a user by ID.
 * @name put/courses/:id
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
 * @param {function} updateCourses - Controller function to handle the request
*/
router.put("/courses/:id", updateCourses);

/**
 * Route to claim rewards for a user by ID.
 * @name put/claim/:id
 * @function
 * @memberof module:routes/userroute
 * @inner
 * @param {string} path - Express path
 * @param {function} middleware - Middleware to verify admin privileges
 * @param {function} handler - Controller function to handle the request
 * @param {function} claimRewards - Controller function to handle the request
*/
router.put("/claim/:id", claimRewards);

export default router;
