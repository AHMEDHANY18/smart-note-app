#!/usr/bin/env node

require("dotenv").config();
const http = require("http");
const debug = require("debug")("adumcar:server");
const app = require("./src/app");
const startApolloServer = require("./apollo.server");

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

// ✅ Listen
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// ✅ Normalize port
function normalizePort(val) {
  const parsedPort = parseInt(val, 10);
  return isNaN(parsedPort) ? val : parsedPort >= 0 ? parsedPort : false;
}

// ✅ Error handler
function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

// ✅ Listening event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);

  const ip = addr?.address ?? "localhost";
  console.log(`🚀 Server running on http://${ip}:${port}`);

  // ✅ Start Apollo server (GraphQL)
  startApolloServer(app, server).catch((err) => {
    console.error("❌ Apollo Server startup failed:", err);
  });
}
