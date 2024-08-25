import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_DB);
    consolo.log(`Database successfully connected`);
  } catch (error) {
    console.log(`Failed to connect to database`);
  }
};

export default connectDB;
