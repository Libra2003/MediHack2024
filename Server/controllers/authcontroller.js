/**
 * @file authcontroller.js
 * @description This file contains the controller functions for user authentication, including signup, login, and user authentication check.
 * It uses bcrypt for password hashing, jsonwebtoken for token generation and verification, and Mongoose for database operations.
 * 
 * @module controllers/authcontroller
 * 
 * @requires ../models/user.js
 * @requires bcryptjs
 * @requires ../utils/error.js
 * @requires jsonwebtoken
 */
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { createError } from "../utils/error.js"
import jwt from 'jsonwebtoken';

/**
 * Handles user signup by creating a new user with a hashed password.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is created.
*/
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });

        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
};

/**
 * Logs in a user by verifying their username and password, and returns a JWT token.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - Throws an error if the username or password is incorrect, or if there is an issue with the database query.
*/
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(400, "Wrong password or username!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET
        );

        const {password, isAdmin, ...other} = user._doc;

        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({...other, token});
    } 
    catch (error) {
        next(error);
    }
};

/**
 * Middleware to check if the user is authenticated.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 * @throws {Error} - Throws an error if the user is not authenticated.
*/
export const checkUser = async (req, res, next) => {
    try{
        const usignedToken = req.body.token;
        if(!usignedToken) return next(createError(401, "You need to login!"));

        try{
            const token = jwt.verify(usignedToken, process.env.JWT_SECRET);
            const userToVerify = await User.findById(token.id);
            if(!userToVerify) return next(createError(401, "You need to login!"));
            return res.status(200).json({authenticated: true});
        } catch(error){
            return next(createError(401, "You need to login!"));
        }
        return next(createError(401, "You need to login!"));
    }
    catch(error){
        next(error);
    }
};
