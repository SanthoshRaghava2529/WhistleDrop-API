const mongoose = require("mongoose");

const moderatorSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            default: "MODERATOR"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Moderator", moderatorSchema);