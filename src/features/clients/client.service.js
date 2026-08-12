const clientRepository = require("./client.repository");

class ClientService {

    // Create Client
async createClient(clientData) {

    const existingClient =
        await clientRepository.findExistingClient(
            clientData.phone,
            clientData.email
        );

    if (existingClient) {
        throw new Error("Client already exists.");
    }

    const client = await clientRepository.createClient(clientData);

    return {
        success: true,
        message: "Client created successfully.",
        data: client,
    };
}

   // Get All Clients
async getAllClients(page = 1, limit = 10, search = "") {

    const result = await clientRepository.getAllClients(
        search,
        page,
        limit
    );

    return {
        success: true,
        data: {
            clients: result.clients,
            pagination: {
                total: result.total,
                page,
                limit,
                totalPages: Math.ceil(result.total / limit),
            },
        },
    };

}
    // Get Client By ID
    async getClientById(clientId) {

        const client = await clientRepository.getClientById(clientId);

        if (!client) {
            throw new Error("Client not found.");
        }

        return {
            success: true,
            data: client,
        };
    }

    // Update Client
    async updateClient(clientId, clientData) {

        const client = await clientRepository.getClientById(clientId);

        if (!client) {
            throw new Error("Client not found.");
        }

        const updatedClient =
            await clientRepository.updateClient(
                clientId,
                clientData
            );

        return {
            success: true,
            message: "Client updated successfully.",
            data: updatedClient,
        };
    }

    // Delete Client
    async deleteClient(clientId) {

        const client = await clientRepository.getClientById(clientId);

        if (!client) {
            throw new Error("Client not found.");
        }

        await clientRepository.deleteClient(clientId);

        return {
            success: true,
            message: "Client deleted successfully.",
        };
    }

}

module.exports = new ClientService();