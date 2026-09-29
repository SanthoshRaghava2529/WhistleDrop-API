const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const reportSchema = new mongoose.Schema(
    {
        caseCode: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Security",
                "Harassment",
                "Corruption",
                "Technical",
                "Other"
            ]
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 5000
        },

        evidenceUrl: {
            type: String,
            trim: true,
            default: null
        },

        status: {
            type: String,
            enum: [
                "SUBMITTED",
                "UNDER_REVIEW",
                "RESOLVED",
                "DISMISSED"
            ],
            default: "SUBMITTED"
        },

        updates: [updateSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Report", reportSchema);