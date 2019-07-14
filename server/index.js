const express = require("express");
const app = express();
const controllers = require("./controllers");

const SERVE_PORT = process.env.PORT || 3000;

app.use(express.static("client"));
app.use("/api", controllers);
app.use((err, req, res) => {
  console.log("Error", err);
  res.status(404).send({well: err});
})

app.listen(SERVE_PORT, () => console.log(`Server running on port ${SERVE_PORT}`));
