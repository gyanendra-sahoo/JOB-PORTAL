import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log(`Mongoose Error ${err.message}`);
    process.exit(1);
  }
};

export { connection };
