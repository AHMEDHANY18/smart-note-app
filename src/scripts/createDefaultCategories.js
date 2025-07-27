// const mongoose = require("mongoose");
// const { Category } = require("../models");

// // تأكد أنك متصل بقاعدة البيانات قبل هذا السطر

// Category.create([
//   {
//     title: "Personal",
//     color: "#FF9800",
//     icon: "🧠",
//     isDefault: true,
//   },
//   {
//     title: "Work",
//     color: "#3F51B5",
//     icon: "💼",
//     isDefault: true,
//   },
//   {
//     title: "Important",
//     color: "#F44336",
//     icon: "❗",
//     isDefault: true,
//   },
//   {
//     title: "Shopping",
//     color: "#4CAF50",
//     icon: "🛒",
//     isDefault: true,
//   },
// ])
//   .then(() => {
//     console.log("✅ Categories created successfully");
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("❌ Error creating categories:", err);
//     mongoose.connection.close();
//   });
