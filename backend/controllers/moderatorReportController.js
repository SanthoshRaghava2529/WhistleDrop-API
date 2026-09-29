const Report = require("../models/Report");

const getReports = async (req, res) => {
    try {
        const { status, category } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (category) {
            filter.category = category;
        }

        const reports = await Report.find(filter)
            .select(
                "caseCode category description evidenceUrl status updates createdAt updatedAt"
            )
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve reports"
        });
    }
};

const updateReportStatus = async (req, res) => {
    try {
        const { caseCode } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "SUBMITTED",
            "UNDER_REVIEW",
            "RESOLVED",
            "DISMISSED"
        ];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const report = await Report.findOne({ caseCode });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        report.status = status;

        await report.save();

        return res.status(200).json({
            success: true,
            message: "Report status updated successfully",
            caseCode: report.caseCode,
            status: report.status
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update report status"
        });
    }
};

const addReportUpdate = async (req, res) => {
    try {
        const { caseCode } = req.params;
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Update message is required"
            });
        }

        if (message.trim().length > 1000) {
            return res.status(400).json({
                success: false,
                message: "Update message must be 1000 characters or less"
            });
        }

        const report = await Report.findOne({ caseCode });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        report.updates.push({
            message: message.trim()
        });

        await report.save();

        return res.status(201).json({
            success: true,
            message: "Report update added successfully",
            caseCode: report.caseCode,
            update: report.updates[report.updates.length - 1]
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to add report update"
        });
    }
};

module.exports = {
    getReports,
    updateReportStatus,
    addReportUpdate
};