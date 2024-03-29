import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Express typescript template",
    description: "Express typescript template",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "",
    },
  ],
  components: {
    // securitySchemes: {
    //   bearerAuth: {
    //     type: "http",
    //     scheme: "bearer",
    //   },
    // },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/user.routes.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
