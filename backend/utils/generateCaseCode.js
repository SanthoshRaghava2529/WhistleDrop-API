const crypto = require("crypto");

const generateCaseCode = () => {
    const randomPart = crypto
        .randomBytes(6)
        .toString("hex")
        .toUpperCase();

    return `WD-${randomPart}`;
};

module.exports = generateCaseCode;