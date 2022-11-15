require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");


const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

db.sequelize
.sync()
.then(() => {
  console.log("Synced db");
})
.catch((err) => {
  console.log("failed to sync db: ", err.message);
});

app.use("/teachers", require("./routes/teacher.routes"));
app.use("/students", require("./routes/student.routes"));
app.use("/classes", require("./routes/class.routes"));

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Sample app listening on port ${port}`));
