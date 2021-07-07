const express = require("express");
const app = express();
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const cors = require("cors");
const foodRoute = require("./routes/food");
const clothesRoute = require("./routes/clothes");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Up and Running!");
});
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/clothes", clothesRoute);

app.use(errorHandler);
app.use("*", notFoundHandler);
module.exports = {
  app,
  start: (port) =>
    app.listen(port, () => console.log(`Listening on port ${port}`)),
};
