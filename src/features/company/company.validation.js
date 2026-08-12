const { body, validationResult } = require("express-validator");

// Create Company Validation
const createCompanyValidation = [
    body("companyName")
        .trim()
        .notEmpty()
        .withMessage("Company name is required"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required"),

    body("gstNumber")
        .optional()
        .trim(),

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

    body("website")
        .optional()
        .trim()
        .isURL()
        .withMessage("Invalid website URL"),

    body("bankName")
        .optional()
        .trim(),

    body("accountNumber")
        .optional()
        .trim(),

    body("ifscCode")
        .optional()
        .trim(),

    body("branch")
        .optional()
        .trim(),

    body("logo")
        .optional()
        .trim(),
];

// Update Company Validation
const updateCompanyValidation = [
    body("companyName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Company name cannot be empty"),

    body("address")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Address cannot be empty"),

    body("gstNumber")
        .optional()
        .trim(),

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

    body("website")
        .optional()
        .trim()
        .isURL()
        .withMessage("Invalid website URL"),

    body("bankName")
        .optional()
        .trim(),

    body("accountNumber")
        .optional()
        .trim(),

    body("ifscCode")
        .optional()
        .trim(),

    body("branch")
        .optional()
        .trim(),

    body("logo")
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
    createCompanyValidation,
    updateCompanyValidation,
    validate,
};