/**
 * Creates a new error object with the specified status and message.
 *
 * @param {number} status - The HTTP status code for the error.
 * @param {string} message - The error message.
 * @returns {Error} The created error object with the specified status and message.
*/
export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};
