const clientService = require("./client.service");

class ClientController {

    // Create Client
    async createClient(req, res, next) {
        try {

            const result = await clientService.createClient(req.body);

            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Get All Clients
    async getAllClients(req, res, next) {
        try {

        const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const search = req.query.search || "";

const result = await clientService.getAllClients(
    page,
    limit,
    search
);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Get Client By ID
    async getClientById(req, res, next) {
        try {

            const { id } = req.params;

            const result = await clientService.getClientById(id);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Update Client
    async updateClient(req, res, next) {
        try {

            const { id } = req.params;

            const result = await clientService.updateClient(
                id,
                req.body
            );

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Delete Client
    async deleteClient(req, res, next) {
        try {

            const { id } = req.params;

            const result = await clientService.deleteClient(id);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new ClientController();