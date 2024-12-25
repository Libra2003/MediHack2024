/**
 * @fileoverview This file contains the controller functions for managing users in the application.
 * It includes functions to update, delete, retrieve a single user, and retrieve all users.
 * Each function interacts with the User model to perform the necessary database operations.
*/
import User from "../models/user.js";

/**
 * Updates a user by their ID with the provided data.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters from the request.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} req.body - The data to update the user with.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
*/
export const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedUser);
    }
    catch(err) {
        next(err);
    }
};

/**
 * Deletes a user by their ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to delete.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 * @throws Will pass any errors to the next middleware function.
*/
export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted!");
    }
    catch(err) {
        next(err);
    }
};

/**
 * Retrieves a user by ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved.
 * @throws {Error} - If an error occurs while retrieving the user.
*/
export const getUser = async (req, res, next) => {
    try{
        const User = await User.findById(
            req.params.id
        );
        res.status(200).json(User);
    }
    catch(err) {
        next(err);
    }
};

/**
 * Retrieves all users from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves to void.
*/
export const getAllUser = async (req, res, next) => {
    try{
        const Users = await User.find();
        res.status(200).json(Users);
    }
    catch(err) {
        next(err);
    }
};

export const updateBadges = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {badges: req.body.badges}},
            {new: true}
        );
        res.status(200).json(updatedUser);
    }
    catch(err) {
        next(err);
    }
}

export const updateCourses = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {courses: req.body.courses}},
            {new: true}
        );
        res.status(200).json(updatedUser);
    }
    catch(err) {
        next(err);
    }
}

export const claimRewards = async (req, res, next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {
                coins: req.body.coins,
                badges: req.body.badges,
                xp: req.body.xp,
                level: req.body.level,
                rewardClaimed: true
            }},
            {new: true}
        );
        res.status(200).json(updatedUser);
    }
    catch(err) {
        next(err);
    }
}
