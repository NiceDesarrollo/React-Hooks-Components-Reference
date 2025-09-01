import app from "./src/app.js";
import { UserService } from "./src/services/userService.js";

const PORT = process.env.PORT || 3001;

// Initialize user service for graceful shutdown
const userService = new UserService();

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API documentation: See api-test.http`);
  console.log(`🏗️  Architecture: Clean MVC structure implemented`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️  Received ${signal}. Graceful shutdown started...`);

  try {
    // Close server
    server.close(() => {
      console.log("✅ HTTP server closed");
    });

    // Disconnect from database
    await userService.disconnect();
    console.log("✅ Database disconnected");

    console.log("✅ Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during graceful shutdown:", error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});
