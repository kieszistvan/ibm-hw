const express = require("express");
const app = express();
const controllers = require("./controllers");

const SERVE_PORT = process.env.PORT || 3000;

app.listen(SERVE_PORT, () => console.log(`Server running on port ${SERVE_PORT}`));
app.use("/api", controllers);