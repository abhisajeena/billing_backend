const companyRepository = require("./company.repository");

class CompanyService {

    // Create Company (Only Once)
    async createCompany(companyData) {

        // Check if company already exists
        const existingCompany = await companyRepository.getCompany();

        if (existingCompany) {
            throw new Error("Company already exists. Please update the existing company.");
        }

        const company = await companyRepository.createCompany(companyData);

        return {
            success: true,
            message: "Company created successfully.",
            data: company,
        };
    }

    // Get Company
    async getCompany() {

        const company = await companyRepository.getCompany();

        if (!company) {
            throw new Error("Company not found.");
        }

        return {
            success: true,
            data: company,
        };
    }

    // Update Company
    async updateCompany(companyId, companyData) {

       const company = await companyRepository.getCompany();

        if (!company) {
            throw new Error("Company not found.");
        }

       const updatedCompany = await companyRepository.updateCompany(
    company._id,
    companyData
);
        return {
            success: true,
            message: "Company updated successfully.",
            data: updatedCompany,
        };
    }

    // Delete Company
    async deleteCompany(companyId) {

        const company = await companyRepository.getCompanyById(companyId);

        if (!company) {
            throw new Error("Company not found.");
        }

        await companyRepository.deleteCompany(companyId);

        return {
            success: true,
            message: "Company deleted successfully.",
        };
    }

}

module.exports = new CompanyService();