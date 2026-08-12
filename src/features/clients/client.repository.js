const Client = require("./client.model");

class ClientRepository {

    // Create Client
    async createClient(clientData) {
        return await Client.create(clientData);
    }

    // Check existing client by phone or email
    async findExistingClient(phone, email) {
        const query = {
            $or: [
                { phone }
            ]
        };

        if (email) {
            query.$or.push({ email });
        }

        return await Client.findOne(query);
    }

    // Get All Clients with Search & Pagination
    async getAllClients(search = "", page = 1, limit = 10) {

        const query = {};

        if (search) {
            query.$or = [
                {
                    clientName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    phone: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const skip = (page - 1) * limit;

        const clients = await Client.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Client.countDocuments(query);

        return {
            clients,
            total,
        };
    }

    // Get Client By ID
    async getClientById(clientId) {
        return await Client.findById(clientId);
    }

    // Update Client
    async updateClient(clientId, clientData) {
        return await Client.findByIdAndUpdate(
            clientId,
            clientData,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    // Delete Client
    async deleteClient(clientId) {
        return await Client.findByIdAndDelete(clientId);
    }
}

module.exports = new ClientRepository();