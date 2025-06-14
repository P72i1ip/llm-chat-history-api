# LLM Chat History API

## Project Overview

This project is a lightweight RESTful API for managing chat records from LLM (Large Language Model)-based conversations. It provides endpoints for creating, retrieving, searching, and managing chat histories, making it suitable for integration into SaaS products that support AI applications.

## Tech Stack

- **Node.js** with **Express.js** (v4.x): API server
- **MongoDB** (Mongoose): Database
- **Jest** or **Postman**: API testing
- **Swagger/OpenAPI**: API documentation
- _(Optional)_ **JWT**: User authentication & authorization
- _(Optional)_ **Docker**: Containerized deployment

> ⚠️ **Note:** Please use Express 4.x. Express 5.x is still in beta and may cause routing issues (e.g., `Missing parameter name`). Do not use 5.x.

## Features

- **User Authentication (Optional)**
  - Secure registration and login (bcrypt + JWT)
  - HTTP-only cookie for token delivery
- **CRUD Operations for Chat Messages**
  - Create, retrieve, update, and delete chat messages
- **Filtering & Search**
  - Filter messages by timestamp, tags
  - Keyword search using MongoDB text indexes
- **Tagging/Labeling (Optional)**
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
- [ ] CRUD API for chat messages
- [ ] Filtering, tagging, and search features
- [ ] API documentation (Swagger)
- [ ] Testing (Jest/Postman)
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

## Additional Notes

- API documentation is available at `/api-docs` (Swagger UI).
- All endpoints and sample requests/responses are documented in the README and Swagger.
- Contributions and issues are welcome!

---
