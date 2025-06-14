# LLM Chat History API

## Project Overview

This project is a lightweight RESTful API designed to manage chat records from LLM (Large Language Model)-based conversations. The goal is to provide a backend service for creating, retrieving, searching, and managing chat histories, suitable for integration into SaaS products supporting AI applications.

## Tech Stack

- **Node.js** with **Express.js**: API server
- **MongoDB** (Mongoose): Database
- **Jest** or **Postman**: API testing
- **Swagger/OpenAPI**: API documentation
- _(Optional)_ **JWT**: Basic authentication
- _(Optional)_ **Docker**: Containerized deployment

> ⚠️ **注意：請使用 Express 4.x 版本。Express 5.x 目前為 beta，可能導致路由解析錯誤（如 `Missing parameter name`），請勿使用 5.x。**

## Features

- **CRUD Operations for Chat Records**
  - Create new chat records
  - Retrieve all chat records
  - Retrieve a single chat record
  - Update chat records
  - Delete chat records
- **Tagging/Labeling (Optional)**
  - Add tags or labels to chat records
- **Search**
  - Search chat records by keywords or timestamps
- **API Documentation**
  - Interactive API docs via Swagger/OpenAPI
- **(Optional) JWT Authentication**
  - Basic user authentication and authorization
- **(Optional) Docker Support**
  - Dockerfile for easy local deployment

## Progress Checklist

- [ ] Project initialization and basic structure
- [ ] MongoDB schema design
- [ ] CRUD API implementation
- [ ] Search and tagging features
- [ ] API documentation (Swagger)
- [ ] Testing (Jest/Postman)
- [ ] JWT authentication (optional)
- [ ] Dockerfile (optional)
- [ ] Final README and project cleanup

## Getting Started

1. Clone the repository and install dependencies:

   ```bash
   git clone <repo-url>
   cd llm-chat-history-api
   npm install
   ```

2. Set up your `.env` file (see `.env.example` for reference)
3. Start the server:

   ```bash
   npm start
   ```

## Additional Notes

- API documentation will be available at `/api-docs` (Swagger UI)
- Contributions and issues are welcome!

---
