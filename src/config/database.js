const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // علشان يخرج من التطبيق لو فشل الاتصال
  });
