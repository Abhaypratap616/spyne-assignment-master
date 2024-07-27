const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to mongodb database");
  })
  .catch((err) => {
    console.log("Error while connnecting db.", err);
  });

module.exports = mongoose;
