const dashboardRepository = require("./dashboard.repository");

class DashboardService {

    // Dashboard Summary
    async getDashboard() {

        const totalClients =
            await dashboardRepository.getTotalClients();

        const totalBills =
            await dashboardRepository.getTotalBills();

        const paidBills =
            await dashboardRepository.getPaidBills();

        const pendingBills =
            await dashboardRepository.getPendingBills();

        const totalRevenue =
            await dashboardRepository.getTotalRevenue();

        const recentBills =
            await dashboardRepository.getRecentBills();

        const recentClients =
            await dashboardRepository.getRecentClients();

        return {

            success: true,

            data: {

                totalClients,

                totalBills,

                paidBills,

                pendingBills,

                totalRevenue,

                recentBills,

                recentClients,

            },

        };

    }

}

module.exports = new DashboardService();