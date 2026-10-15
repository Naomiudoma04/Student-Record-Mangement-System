Student Record Management System

A simple backend application built with Node.js and Express.js to manage student records.

Features
Create, retrieve, update, and delete student records (CRUD operations).
Validate student information using middleware.
Handle errors with appropriate HTTP status codes.

Technologies
Node.js
Express.js
JavaScript
JSON

Installation

1. Clone the repository.
2. Run npm install to install dependencies.
3. Start the server using the configured start command.

API Endpoints
GET /students retrieves all student records.
GET /students/
POST /students creates a new student record.
PUT /students/
DELETE /students/

Middleware
Middleware is used to validate student information and handle requests before they reach the route handlers.
