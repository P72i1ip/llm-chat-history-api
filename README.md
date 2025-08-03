# LLM Chat History API

## Project Overview

This project is a lightweight RESTful API for managing chat records from LLM (Large Language Model)-based conversations. It provides endpoints for creating, retrieving, searching, and managing chat histories, making it suitable for integration into SaaS products that support AI applications.

## Tech Stack

- **Node.js** with **Express.js** (v4.x): API server
- **MongoDB** (Mongoose): Database
- **Docker**: Containerization
- **Jest** or **Postman**: API testing
- **Swagger/OpenAPI**: API documentation
- **JWT**: User authentication & authorization

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
- **Docker Support**
  - `Dockerfile` and `docker-compose.yml` for easy local deployment

## Progress Checklist

- [x] Project initialization and structure
- [x] MongoDB schema design
- [x] User authentication (optional)
- [x] CRUD API for chat messages
- [x] Filtering, tagging, and search features
- [x] API documentation (Swagger)
- [x] Testing (Jest/Postman)
- [x] Dockerfile & Docker Compose setup
- [x] Final README and cleanup

---

## Getting Started

Follow these steps to set up and run the project.

### 1. Clone the Repository

First, clone the project to your local machine:

```bash
git clone https://github.com/P72i1ip/llm-chat-history-api.git
cd llm-chat-history-api
```

### 2. Configure Environment Variables

The application requires environment variables to connect to the database and configure settings.

1. Create a `.env` file in the project root. You can copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and fill in your values, especially for `DATABASE` and `JWT_SECRET`.
3. **Important:** Ensure the `PORT` is set to `8000` for consistency with the Docker setup.

   ```dotenv
   # .env
   PORT=8000
   DATABASE=mongodb+srv://...
   JWT_SECRET=...
   # ... other variables
   ```

### 3. Run the Application

You have two options to run the server. Docker is the recommended method as it provides a consistent environment.

---

#### Option A: Run with Docker (Recommended)

This method uses Docker to build and run the application in a container.

**Prerequisites:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Instructions:**

> **Note:** You do not need to run `npm install` on your local machine. Docker will handle all dependencies inside the container.

To build the image and start the container, run:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`.

---

#### Option B: Run Locally

This method runs the application directly on your machine.

**Prerequisites:**

- [Node.js](https://nodejs.org/) (v18 or later) and npm installed.

**Instructions:**

1. Install the project dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

The API will be available at `http://localhost:8000`.

---

## API Documentation

Once the application is running (using either method), you can access the interactive Swagger UI to explore and test all endpoints:

- **URL:** [http://localhost:8000/api-docs](http://localhost:8000/api-docs)

---

## Usage

- Use Postman or Swagger UI to test all endpoints.
- For JWT-protected routes, login first and use the returned token as a Bearer token or via cookie.
- Example requests and responses are available in Swagger UI.

## Additional Notes

- All endpoints and sample requests/responses are documented in Swagger.
- Future improvements: advanced search (text index), more automated tests, and CI/CD pipeline setup.

---
