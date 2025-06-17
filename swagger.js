export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LLM Chat History API',
      version: '1.0.0',
      description: 'API documentation for LLM Chat History project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // let swagger-jsdoc know where to find the API documentation comments
};