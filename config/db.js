import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database !!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
