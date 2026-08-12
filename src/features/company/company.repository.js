const Company = require("./company.model");

class CompanyRepository {

    // Create Company
    async createCompany(companyData) {
        return await Company.create(companyData);
    }

    // Get Company
    async getCompany() {
        return await Company.findOne();
    }

    // Get Company By ID
    async getCompanyById(companyId) {
        return await Company.findById(companyId);
    }

    // Update Company
    async updateCompany(companyId, companyData) {
        return await Company.findByIdAndUpdate(
            companyId,
            companyData,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    // Delete Company
    async deleteCompany(companyId) {
        return await Company.findByIdAndDelete(companyId);
    }

}

module.exports = new CompanyRepository();