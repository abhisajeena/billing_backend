const Bill = require("./bill.model");

const generateBillNumber = async () => {

    // Get the latest bill
    const latestBill = await Bill.findOne()
        .sort({ createdAt: -1 });

    if (!latestBill) {
        return "INV-0001";
    }

    // Extract the number part
    const lastNumber = parseInt(
        latestBill.billNumber.split("-")[1]
    );

    // Increment it
    const nextNumber = lastNumber + 1;

    // Return formatted bill number
    return `INV-${String(nextNumber).padStart(4, "0")}`;

};

module.exports = generateBillNumber;