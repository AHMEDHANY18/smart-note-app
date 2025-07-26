const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
}).then(() => {
  console.log("Success => Connected to database...")
}).catch((err)=>{
  console.log("🚀 ~ file: database.js:10 ~ err:", err)
  console.log("Error => Cannot connect to database!")
});