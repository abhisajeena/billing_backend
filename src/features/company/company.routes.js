const express = require("express");

const companyController = require("./company.controller");
const {
    authenticate,
    authorize,
} = require("../auth/auth.middleware");

const {
    createCompanyValidation,
    updateCompanyValidation,
    validate,
} = require("./company.validation");

const router = express.Router();

// Create Company (Admin Only)
router.post(
    "/create",
    authenticate,
    authorize("admin"),
    createCompanyValidation,
    validate,
    companyController.createCompany
);

// Get Company
router.get(
    "/all",
    authenticate,
    companyController.getCompany
);

// Update Company (Admin Only)
router.put(
    "/update",
    authenticate,
    authorize("admin"),
    updateCompanyValidation,
    validate,
    companyController.updateCompany
);

// Delete Company (Optional)
router.delete(
    "/delete/:id",
    authenticate,
    authorize("admin"),
    companyController.deleteCompany
);

module.exports = router;