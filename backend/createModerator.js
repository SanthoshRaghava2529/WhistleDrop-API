require("dotenv").config();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const Moderator = require("./models/Moderator");

const createModerator = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");

        const email = process.env.MODERATOR_EMAIL;
        const password = process.env.MODERATOR_PASSWORD;

        if (!email || !password) {
            throw new Error(
                "MODERATOR_EMAIL and MODERATOR_PASSWORD must be in .env"
            );
        }

        const existingModerator = await Moderator.findOne({
            email: email.toLowerCase()
        });

        if (existingModerator) {
            console.log("Moderator already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await Moderator.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "MODERATOR"
        });

        console.log("Moderator created successfully");

        process.exit(0);
    } catch (error) {
        console.error("Failed to create moderator:");
        console.error(error.message);

        process.exit(1);
    }
};

createModerator();