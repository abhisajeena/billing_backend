const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const authMiddleware = require("./auth.middleware");

const {
    registerValidation,
    loginValidation,
    validate,
} = require("./auth.validation");

// Register
router.post(
    "/register",
    registerValidation,
    validate,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidation,
    validate,
    authController.login
);

// Profile
router.get(
    "/profile",
    authMiddleware.authenticate,
    authController.profile
);

module.exports = router;