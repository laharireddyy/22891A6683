const express = require("express");
const cors       = require("cors");
const { configure, Log } = require("../LoggingMiddleware");
const shorturlsRoutes = require("./routes/shorturls");


const BEARER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWhhcmllcHBhbGFwYWxsaUBnbWFpbC5jb20iLCJleHAiOjE3NTY5NzA5NDQsImlhdCI6MTc1Njk3MDA0NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFmOGQ0OWJmLTllYjktNDVhMy1iNzFmLWVhM2ZhMmQxMGZhYyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImVwcGFsYXBhbGxpIGxhaGFyaSIsInN1YiI6IjJkYzI2YWVmLWY3M2MtNDIyMi04MzA1LWU1MjQ4YzA3N2IwYSJ9LCJlbWFpbCI6ImxhaGFyaWVwcGFsYXBhbGxpQGdtYWlsLmNvbSIsIm5hbWUiOiJlcHBhbGFwYWxsaSBsYWhhcmkiLCJyb2xsTm8iOiIyMjg5MWE2NjgzIiwiYWNjZXNzQ29kZSI6Ill6dUplVSIsImNsaWVudElEIjoiMmRjMjZhZWYtZjczYy00MjIyLTgzMDUtZTUyNDhjMDc3YjBhIiwiY2xpZW50U2VjcmV0IjoiRUVZWFROcXhkREdFRGdIdiJ9.aMczRPQQ2s07Ngip6AeBGF_HY5-U6SJ1Fntry94VDp4";

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
