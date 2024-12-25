/**
 * @fileoverview Defines the routes for user authentication including signup, login, and user check.
*/
import express from "express";
import { login, signup, checkUser } from "../controllers/authcontroller.js";
import { verifyUser } from "../utils/verifyToken.js";

/**
 * Express router to mount user authentication related functions on.
 * @type {object}
 * @const
 * @namespace authRouter
*/
const router = express.Router();

/**
 * Route serving user signup.
 * @name post/signup
 * @function
 * @memberof authRouter
 * @inner
 * @param {string} path - Express path
 * @param {function} signup - Controller function for user signup
*/
router.post("/signup", signup);

/**
 * Route serving user login.
 * @name post/login
 * @function
 * @memberof authRouter
 * @inner
 * @param {string} path - Express path
 * @param {function} login - Controller function for user login
*/
router.post("/login", login);

/**
 * Route serving user check.
 * @name post/checkUser
 * @function
 * @memberof authRouter
 * @inner
 * @param {string} path - Express path
 * @param {function} checkUser - Controller function to check user status
*/
router.post("/checkUser", checkUser);

export default router;