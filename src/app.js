const express = require("express");
const app = express();

// 💾 Load configs
require("./config/database");

// 🧩 Load global middlewares
require("./middlewares/index.moiddleware")(app, express);

// ❌ شيل 404 handler من هنا تمامًا

// 🔥 Global error handler (خليه)
const {
  GlobalErrorHandler,
} = require("./middlewares/authorization.middlewares/asyncHandler");
app.use(GlobalErrorHandler);

module.exports = app;
