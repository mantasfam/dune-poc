import path from "path";
import router from "./app";
import Helmet from "helmet";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.ENV === "prod") {
  // run data sync methods only on production
}

// for testing
app.use(express.static(path.join(__dirname, "..", "public")));

// Start server
app.use(router);
app.use(Helmet());
const server = app.listen(PORT, () => console.log("Listening on port " + PORT));

export default server;
