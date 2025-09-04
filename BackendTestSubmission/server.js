const express = require("express");
const cors       = require("cors");
const { configure, Log } = require("../LoggingMiddleware");
const shorturlsRoutes = require("./routes/shorturls");


const BEARER = "";

configure({ bearerToken: BEARER });

const app = express();
const PORT = 3000;

app.use(cors());           
app.use(express.json());   


app.use((req, res, next) => {
  Log("backend", "debug", "route", `Incoming ${req.method} ${req.url}`);
  next();
});

app.use("/shorturls", shorturlsRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});