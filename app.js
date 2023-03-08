const express = require("express");
const connectToDB = require("./config/mongooseConnection");
const app = express();
const adminsRouter = require("./routers/admins");
const port = 3001;

app.get("/health", (req, res) => {
  return res.json({
    data: "working",
  });
});

connectToDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/admin/", adminsRouter);
app.listen(port, () => {
  console.log(`Connected to server on port: ${port}`);
});
