const calculateBill = (items, discount = 0) => {

    let subTotal = 0;
    let gstTotal = 0;

    const updatedItems = items.map((item) => {

        const itemTotal = item.quantity * item.unitPrice;

        const gstAmount = (itemTotal * item.gst) / 100;

        const total = itemTotal + gstAmount;

        subTotal += itemTotal;
        gstTotal += gstAmount;

        return {
            ...item,
            total,
        };

    });

    const grandTotal = subTotal + gstTotal - discount;

    return {
        items: updatedItems,
        subTotal,
        gstTotal,
        discount,
        grandTotal,
    };

};

module.exports = calculateBill;