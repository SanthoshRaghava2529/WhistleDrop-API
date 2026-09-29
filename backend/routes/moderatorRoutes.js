const express = require("express");

const {
    loginModerator
} = require("../controllers/moderatorController");

const {
    getReports,
    updateReportStatus,
    addReportUpdate
} = require("../controllers/moderatorReportController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginModerator);

router.get("/reports", protect, getReports);

router.patch(
    "/reports/:caseCode/status",
    protect,
    updateReportStatus
);

router.post(
    "/reports/:caseCode/update",
    protect,
    addReportUpdate
);

module.exports = router;