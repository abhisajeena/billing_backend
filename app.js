const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./src/features/auth/auth.routes");
const companyRoutes = require("./src/features/company/company.routes");
const clientRoutes = require("./src/features/clients/client.routes");
const billRoutes = require("./src/features/bills/bill.routes");
const dashboardRoutes = require("./src/features/dashboard/dashboard.routes");
const errorHandler = require("./src/middleware/errorHandler");
const notFound = require("./src/middleware/notFound");

// Allowed frontend URLs
const allowedOrigins = [
    "https://friendly-clafoutis-b98e5e.netlify.app",
    "http://localhost:5173",
    "http://localhost:5174",
];

// CORS
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests without an origin (Postman, mobile apps, etc.)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Feature Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Billing API Running Successfully",
    });
});

module.exports = app;