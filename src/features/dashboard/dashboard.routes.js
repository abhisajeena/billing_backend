const express = require("express");

const dashboardController = require("./dashboard.controller");

const {
    authenticate,
    authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

// Get Dashboard
router.get(
    "/",
    authenticate,
    authorize("admin"),
    dashboardController.getDashboard
);

module.exports = router;