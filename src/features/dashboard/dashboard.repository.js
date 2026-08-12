const Client = require("../clients/client.model");
const Bill = require("../bills/bill.model");

class DashboardRepository {

    // Total Clients
    async getTotalClients() {
        return await Client.countDocuments();
    }

    // Total Bills
    async getTotalBills() {
        return await Bill.countDocuments();
    }

    // Paid Bills
    async getPaidBills() {
        return await Bill.countDocuments({
            paymentStatus: "Paid",
        });
    }

    // Pending Bills
    async getPendingBills() {
        return await Bill.countDocuments({
            paymentStatus: "Pending",
        });
    }

    // Total Revenue
    async getTotalRevenue() {

        const result = await Bill.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$grandTotal",
                    },
                },
            },
        ]);

        return result.length ? result[0].total : 0;
    }

    // Recent Bills
    async getRecentBills() {

        return await Bill.find()
            .populate("client")
            .sort({ createdAt: -1 })
            .limit(5);

    }

    // Recent Clients
    async getRecentClients() {

        return await Client.find()
            .sort({ createdAt: -1 })
            .limit(5);

    }

}

module.exports = new DashboardRepository();