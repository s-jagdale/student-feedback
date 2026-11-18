const serverless = require("serverless-http");
const { app } = require("../../src/app");

// Netlify rewrites /api/... to this function while preserving the /api/... path.
exports.handler = serverless(app);
