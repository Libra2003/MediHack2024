import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/user.js";

/**
 * Middleware to verify the JWT token from cookies.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
*/
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}

/**
 * Middleware to verify if the user is authenticated and authorized.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
*/
export const verifyUser = (req, res, next) => {
    verifyToken (req, res, next, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

/**
 * Middleware to verify if the user is an admin.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
*/
export const verifyAdmin = (req, res, next) => {
    verifyToken (req, res, next, () => {
        const user = User.findById(req.user.id);

        if(user.isAdmin){
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};