const companyService = require("./company.service");

class CompanyController {

    // Create Company
    async createCompany(req, res, next) {
        try {

            const result = await companyService.createCompany(req.body);

            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Get Company
    async getCompany(req, res, next) {
        try {

            const result = await companyService.getCompany();

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Update Company
    async updateCompany(req, res, next) {
        try {

            const { id } = req.params;

            const result = await companyService.updateCompany(
                id,
                req.body
            );

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Delete Company
    async deleteCompany(req, res, next) {
        try {

            const { id } = req.params;

            const result = await companyService.deleteCompany(id);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new CompanyController();