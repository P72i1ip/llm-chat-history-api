# LLM Chat History API

## Project Overview

This project is a lightweight RESTful API for managing chat records from LLM (Large Language Model)-based conversations. It provides endpoints for creating, retrieving, searching, and managing chat histories, making it suitable for integration into SaaS products that support AI applications.

## Tech Stack

- **Node.js** with **Express.js** (v4.x): API server
- **MongoDB** (Mongoose): Database
- **Jest** or **Postman**: API testing
- **Swagger/OpenAPI**: API documentation
- **JWT**: User authentication & authorization
- _(Optional)_ **Docker**: Containerized deployment

> ⚠️ **Note:** Please use Express 4.x. Express 5.x is still in beta and may cause routing issues (e.g., `Missing parameter name`). Do not use 5.x.

## Features

- **User Authentication**
  - Secure registration and login (bcrypt + JWT)
  - HTTP-only cookie for token delivery
- **CRUD Operations for Chat Messages**
  - Create, retrieve, update, and delete chat messages
- **Filtering & Search**
  - Filter messages by timestamp, tags
  - Keyword search (regex-based; text index planned for future)
- **Tagging/Labeling**
  - Add tags or labels to chat messages
- **API Documentation**
  - Interactive docs via Swagger/OpenAPI (`/api-docs`)
- **Testing**
  - Manual testing with Postman or automated with Jest
- **(Optional) Docker Support**
  - Dockerfile for easy local deployment

## Progress Checklist

- [x] Project initialization and structure
- [x] MongoDB schema design
- [x] User authentication (optional)
- [x] CRUD API for chat messages
- [x] Filtering, tagging, and search features
- [x] API documentation (Swagger)
- [x] Testing (Jest/Postman)
- [ ] Dockerfile (optional)
- [x] Final README and cleanup

## Getting Started

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/P72i1ip/llm-chat-history-api.git
   cd llm-chat-history-api
   npm install
   ```

2. **Set up your environment variables:**  
   Copy `.env.example` to `.env` and fill in the required values.

3. **Start the server:**

   ```bash
   npm start
   ```

4. **API Documentation:**  
   Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) for interactive Swagger UI.

## Usage

- Use Postman or Swagger UI to test all endpoints.
- For JWT-protected routes, login first and use the returned token as a Bearer token or via cookie.
- Example requests and responses are available in Swagger UI.

## Additional Notes

- All endpoints and sample requests/responses are documented in Swagger.
- Future improvements: Dockerfile, advanced search (text index), and more automated tests.

---
