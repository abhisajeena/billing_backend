const billService = require("./bill.service");

class BillController {

    // Create Bill
    async createBill(req, res, next) {
        try {

            const result = await billService.createBill(req.body);

            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Get All Bills
    async getAllBills(req, res, next) {
        try {

           const page = parseInt(req.query.page) || 1;

const limit = parseInt(req.query.limit) || 10;

const search = req.query.search || "";

const result = await billService.getAllBills(
    page,
    limit,
    search
);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Get Bill By ID
    async getBillById(req, res, next) {
        try {

            const { id } = req.params;

            const result = await billService.getBillById(id);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Update Bill
    async updateBill(req, res, next) {
        try {

            const { id } = req.params;

            const result = await billService.updateBill(
                id,
                req.body
            );

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

    // Delete Bill
    async deleteBill(req, res, next) {
        try {

            const { id } = req.params;

            const result = await billService.deleteBill(id);

            return res.status(200).json(result);

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new BillController();