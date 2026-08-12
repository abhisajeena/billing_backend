const Bill = require("./bill.model");

class BillRepository {

    // Create Bill
    async createBill(billData) {
        return await Bill.create(billData);
    }

   // Get All Bills with Search & Pagination
async getAllBills(search, page, limit) {

    const skip = (page - 1) * limit;

    let query = {};

    // Search by Bill Number
    if (search) {

        const bills = await Bill.find()
            .populate("client");

        const filteredBills = bills.filter((bill) => {

            return (

                bill.billNumber
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                bill.client?.clientName
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                bill.paymentStatus
                    .toLowerCase()
                    .includes(search.toLowerCase())

            );

        });

        const total = filteredBills.length;

        return {

            bills: filteredBills.slice(skip, skip + limit),

            total,

        };

    }

    const bills = await Bill.find()

        .populate("company")

        .populate("client")

        .sort({ createdAt: -1 })

        .skip(skip)

        .limit(limit);

    const total = await Bill.countDocuments();

    return {

        bills,

        total,

    };

}

    // Get Bill By ID
    async getBillById(billId) {
        return await Bill.findById(billId)
            .populate("company")
            .populate("client");
    }

    // Update Bill
    async updateBill(billId, billData) {
        return await Bill.findByIdAndUpdate(
            billId,
            billData,
            {
                new: true,
                runValidators: true,
            }
        )
        .populate("company")
        .populate("client");
    }

    // Delete Bill
    async deleteBill(billId) {
        return await Bill.findByIdAndDelete(billId);
    }

}

module.exports = new BillRepository();