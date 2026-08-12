const dashboardService = require("./dashboard.service");

class DashboardController {

    // Get Dashboard
    async getDashboard(req, res, next) {
        try {

            const result = await dashboardService.getDashboard();

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new DashboardController();