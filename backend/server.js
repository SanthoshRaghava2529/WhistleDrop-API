require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const helmet = require("helmet");
const swaggerDocument = YAML.load("./swagger.yaml");

const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");
const moderatorRoutes = require("./routes/moderatorRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/reports", reportRoutes);
app.use("/api/moderator", moderatorRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "WhistleDrop API is running"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

if (require.main === module) {
    startServer();
}

module.exports = app;