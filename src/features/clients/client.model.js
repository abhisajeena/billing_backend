const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
    {
        clientName: {
            type: String,
            required: [true, "Client name is required"],
            trim: true,
        },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: "",
        },

        gstNumber: {
            type: String,
            trim: true,
            default: "",
        },

        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
        },

        city: {
            type: String,
            trim: true,
            default: "",
        },

        state: {
            type: String,
            trim: true,
            default: "",
        },

        pincode: {
            type: String,
            trim: true,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Client", clientSchema);