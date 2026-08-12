const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        gst: {
            type: Number,
            default: 0,
        },

        total: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const billSchema = new mongoose.Schema(
    {
        billNumber: {
            type: String,
            required: true,
            unique: true,
        },

        billDate: {
            type: Date,
            default: Date.now,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },

        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },

        items: {
            type: [billItemSchema],
            required: true,
        },

        subTotal: {
            type: Number,
            required: true,
        },

        discount: {
            type: Number,
            default: 0,
        },

        gstTotal: {
            type: Number,
            default: 0,
        },

        grandTotal: {
            type: Number,
            required: true,
        },

        amountInWords: {
            type: String,
            default: "",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },

        notes: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bill", billSchema);