import mongoose from "mongoose";

const connectDB = async () =>
  mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log("DB connected successfully....."))
    .catch((error) =>
      console.log(`Failed to connected to DB: ${error.message}!`)
    );

export default connectDB;
