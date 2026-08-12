const express = require("express");

const clientController = require("./client.controller");

const {
    authenticate,
    authorize,
} = require("../auth/auth.middleware");

const {
    createClientValidation,
    updateClientValidation,
    validate,
} = require("./client.validation");

const router = express.Router();

// Create Client
router.post(
    "/create",
    authenticate,
    authorize("admin"),
    createClientValidation,
    validate,
    clientController.createClient
);

// Get All Clients
router.get(
    "/",
    authenticate,
    clientController.getAllClients
);

// Get Client By ID
router.get(
    "/:id",
    authenticate,
    clientController.getClientById
);

// Update Client
router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    updateClientValidation,
    validate,
    clientController.updateClient
);

// Delete Client
router.delete(
    "/:id",
    authenticate,
    authorize("admin"),
    clientController.deleteClient
);

module.exports = router;