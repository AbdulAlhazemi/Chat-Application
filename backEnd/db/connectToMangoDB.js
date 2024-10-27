import mongoose from "mongoose";

const connectToMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL)
    console.log('connecting to mongo DB')
  } catch (error) {
    console.log('error connecting to the DB', error.massage)
  }
}

export default connectToMongoDB