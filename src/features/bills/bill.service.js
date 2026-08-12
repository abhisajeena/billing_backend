const billRepository = require("./bill.repository");
const companyRepository = require("../company/company.repository");
const clientRepository = require("../clients/client.repository");

const calculateBill = require("./calculateBill");
const generateBillNumber = require("./generateBillNumber");
const amountToWords = require("./amountToWords");

class BillService {

    // Create Bill
    async createBill(billData) {

        // Check Company
        const company = await companyRepository.getCompany();

        if (!company) {
            throw new Error("Company not found.");
        }

        // Check Client
        const client = await clientRepository.getClientById(
            billData.client
        );

        if (!client) {
            throw new Error("Client not found.");
        }

        // Generate Bill Number
        const billNumber = await generateBillNumber();

        // Calculate Bill
        const calculation = calculateBill(
            billData.items,
            billData.discount || 0
        );

        // Amount In Words
        const words = amountToWords(
            calculation.grandTotal
        );

        // Save Bill
        const bill = await billRepository.createBill({

            billNumber,

            company: company._id,

            client: client._id,

            billDate: billData.billDate,

            items: calculation.items,

            subTotal: calculation.subTotal,

            gstTotal: calculation.gstTotal,

            discount: calculation.discount,

            grandTotal: calculation.grandTotal,

            amountInWords: words,

            paymentStatus:
                billData.paymentStatus || "Pending",

            notes:
                billData.notes || ""

        });

        return {
            success: true,
            message: "Bill created successfully.",
            data: bill,
        };
    }

  async getAllBills(page = 1, limit = 10, search = "") {

    const result = await billRepository.getAllBills(
        search,
        page,
        limit
    );

    return {

        success: true,

        data: {

            bills: result.bills,

            pagination: {

                total: result.total,

                page,

                limit,

                totalPages: Math.ceil(
                    result.total / limit
                ),

            },

        },

    };

}

    // Get Bill By ID
    async getBillById(billId) {

        const bill = await billRepository.getBillById(billId);

        if (!bill) {
            throw new Error("Bill not found.");
        }

        return {
            success: true,
            data: bill,
        };

    }

    // Update Bill
    async updateBill(billId, billData) {

        // Check Bill
        const bill = await billRepository.getBillById(billId);

        if (!bill) {
            throw new Error("Bill not found.");
        }

        // Check Client
        const client = await clientRepository.getClientById(
            billData.client
        );

        if (!client) {
            throw new Error("Client not found.");
        }

        // Recalculate Bill
        const calculation = calculateBill(
            billData.items,
            billData.discount || 0
        );

        // Amount In Words
        const words = amountToWords(
            calculation.grandTotal
        );

        // Update Bill
        const updatedBill = await billRepository.updateBill(
            billId,
            {
                client: client._id,

                billDate: billData.billDate,

                items: calculation.items,

                subTotal: calculation.subTotal,

                gstTotal: calculation.gstTotal,

                discount: calculation.discount,

                grandTotal: calculation.grandTotal,

                amountInWords: words,

                paymentStatus:
                    billData.paymentStatus || "Pending",

                notes:
                    billData.notes || "",
            }
        );

        return {
            success: true,
            message: "Bill updated successfully.",
            data: updatedBill,
        };

    }

    // Delete Bill
    async deleteBill(billId) {

        const bill = await billRepository.getBillById(billId);

        if (!bill) {
            throw new Error("Bill not found.");
        }

        await billRepository.deleteBill(billId);

        return {
            success: true,
            message: "Bill deleted successfully.",
        };

    }

}

module.exports = new BillService();