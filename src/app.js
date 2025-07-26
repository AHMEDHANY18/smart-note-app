const express = require("express");
const app = express();

// 💾 Load configs
require("./config/database");

// 🧩 Load global middlewares
require("./middlewares/index.moiddleware")(app, express);


// ❌ 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});

// 🔥 Global error handler
const { GlobalErrorHandler } = require("./middlewares/authorization.middlewares/asyncHandler");
app.use(GlobalErrorHandler);

module.exports = app;
