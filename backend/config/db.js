const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inventory";

  try {
    await mongoose.connect(uri);
    const databaseName =
      mongoose.connection.name || new URL(uri).pathname.replace("/", "");
    const sanitizedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");

    console.log(
      `MongoDB Connected: ${mongoose.connection.host}/${databaseName}`,
    );
    console.log(`MongoDB URI: ${sanitizedUri}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
