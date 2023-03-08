const mongoose = require("mongoose");

module.exports = async () => {
  try {
    console.log("Attempting To Connect To DB");
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected");
  } catch (error) {
    console.log("Error while trying to connect to DB");
    console.log(error.message);
  }
};
