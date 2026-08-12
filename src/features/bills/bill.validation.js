const { body, validationResult } = require("express-validator");

// Create Bill Validation
const createBillValidation = [

    body("client")
        .notEmpty()
        .withMessage("Client is required"),

    body("items")
        .isArray({ min: 1 })
        .withMessage("At least one item is required"),

    body("items.*.itemName")
        .notEmpty()
        .withMessage("Item name is required"),

    body("items.*.quantity")
        .isNumeric()
        .withMessage("Quantity must be a number")
        .custom(value => value > 0)
        .withMessage("Quantity must be greater than zero"),

    body("items.*.unitPrice")
        .isNumeric()
        .withMessage("Unit price must be a number")
        .custom(value => value >= 0)
        .withMessage("Unit price cannot be negative"),

    body("items.*.gst")
        .optional()
        .isNumeric()
        .withMessage("GST must be a number"),

    body("discount")
        .optional()
        .isNumeric()
        .withMessage("Discount must be a number"),

    body("paymentStatus")
        .optional()
        .isIn(["Pending", "Paid"])
        .withMessage("Invalid payment status"),

];

// Update Bill Validation
const updateBillValidation = [

    body("client")
        .optional()
        .notEmpty()
        .withMessage("Client cannot be empty"),

    body("items")
        .optional()
        .isArray({ min: 1 })
        .withMessage("Items must be an array"),

    body("discount")
        .optional()
        .isNumeric()
        .withMessage("Discount must be a number"),

    body("paymentStatus")
        .optional()
        .isIn(["Pending", "Paid"])
        .withMessage("Invalid payment status"),

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
    createBillValidation,
    updateBillValidation,
    validate,
};