# WhistleDrop

WhistleDrop is an anonymous reporting backend/API that allows users to submit reports without storing their identity and allows authorized moderators to review and manage reports.

## Features

- Anonymous report submission
- Unique case code generation
- Report tracking using case code
- Report categories
- Evidence/reference URL support
- Report status management
- Moderator authentication using JWT
- Password hashing using bcrypt
- Moderator report filtering
- Moderator updates on reports
- Status transition validation
- Input validation
- Security headers using Helmet
- CORS support
- Swagger/OpenAPI documentation
- Automated API tests

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Helmet
- CORS
- Swagger/OpenAPI
- Jest
- Supertest

## Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── moderatorController.js
│   ├── moderatorReportController.js
│   └── reportController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Moderator.js
│   └── Report.js
│
├── routes/
│   ├── moderatorRoutes.js
│   └── reportRoutes.js
│
├── tests/
│   └── api.test.js
│
├── utils/
│   └── generateCaseCode.js
│
├── .env
├── .gitignore
├── createModerator.js
├── server.js
├── swagger.yaml
├── package.json
└── README.md

This project was developed as part of a GDG club selection task.