const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to Mongo!");
  } catch (error) {
    console.error("Failed to connect with mongo", error);
  }
};

module.exports = connection;
