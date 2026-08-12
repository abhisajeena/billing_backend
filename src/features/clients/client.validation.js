const { body, validationResult } = require("express-validator");

// Create Client Validation
const createClientValidation = [

    body("clientName")
        .trim()
        .notEmpty()
        .withMessage("Client name is required"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid email address"),

    body("gstNumber")
        .optional()
        .trim(),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),

    body("city")
        .optional()
        .trim(),

    body("state")
        .optional()
        .trim(),

    body("pincode")
        .optional()
        .trim(),

];

// Update Client Validation
const updateClientValidation = [

    body("clientName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Client name cannot be empty"),

    body("phone")
        .optional()
        .trim()
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage("Invalid email address"),

    body("gstNumber")
        .optional()
        .trim(),

    body("address")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Address cannot be empty"),

    body("city")
        .optional()
        .trim(),

    body("state")
        .optional()
        .trim(),

    body("pincode")
        .optional()
        .trim(),

];

// Validation Middleware
const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });

    }

    next();
};

module.exports = {
    createClientValidation,
    updateClientValidation,
    validate,
};