const express = require("express");

const billController = require("./bill.controller");

const {
    authenticate,
    authorize,
} = require("../auth/auth.middleware");

const {
    createBillValidation,
    updateBillValidation,
    validate,
} = require("./bill.validation");

const router = express.Router();

// Create Bill
router.post(
    "/create",
    authenticate,
    authorize("admin"),
    createBillValidation,
    validate,
    billController.createBill
);

// Get All Bills
router.get(
    "/",
    authenticate,
    billController.getAllBills
);

// Get Bill By ID
router.get(
    "/:id",
    authenticate,
    billController.getBillById
);

// Update Bill
router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateBillValidation,
    validate,
    billController.updateBill
);

// Delete Bill
router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    billController.deleteBill
);

module.exports = router;