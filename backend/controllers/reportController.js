const Report = require("../models/Report");
const generateCaseCode = require("../utils/generateCaseCode");

const createReport = async (req, res) => {
    try {
        const {
            category,
            description,
            evidenceUrl
        } = req.body;

        if (!category || !description) {
            return res.status(400).json({
                success: false,
                message: "Category and description are required"
            });
        }

        const report = await Report.create({
            caseCode: generateCaseCode(),
            category,
            description,
            evidenceUrl: evidenceUrl || null
        });

        return res.status(201).json({
            success: true,
            message: "Report submitted successfully",
            caseCode: report.caseCode,
            status: report.status
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to submit report"
        });
    }
};

const getReportByCaseCode = async (req, res) => {
    try {
        const { caseCode } = req.params;

        const report = await Report.findOne({
            caseCode
        }).select(
            "caseCode category status updates createdAt updatedAt"
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Invalid case code"
            });
        }

        return res.status(200).json({
            success: true,
            report
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve report"
        });
    }
};

module.exports = {
    createReport,
    getReportByCaseCode
};