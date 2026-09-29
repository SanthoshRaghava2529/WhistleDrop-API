const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Moderator = require("../models/Moderator");

const loginModerator = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const moderator = await Moderator.findOne({
            email: email.toLowerCase()
        });

        if (!moderator) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            moderator.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: moderator._id,
                role: moderator.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};

module.exports = {
    loginModerator
};