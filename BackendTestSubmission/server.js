const express = require("express");
const cors       = require("cors");
const { configure, Log } = require("../LoggingMiddleware");
const shorturlsRoutes = require("./routes/shorturls");


const BEARER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWhhcmllcHBhbGFwYWxsaUBnbWFpbC5jb20iLCJleHAiOjE3NTY5NjY3MjEsImlhdCI6MTc1Njk2NTgyMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk5OTg1NTZiLWM5MGMtNDUyNi04MDAwLWViMjg4Y2M0NGRkZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImVwcGFsYXBhbGxpIGxhaGFyaSIsInN1YiI6IjJkYzI2YWVmLWY3M2MtNDIyMi04MzA1LWU1MjQ4YzA3N2IwYSJ9LCJlbWFpbCI6ImxhaGFyaWVwcGFsYXBhbGxpQGdtYWlsLmNvbSIsIm5hbWUiOiJlcHBhbGFwYWxsaSBsYWhhcmkiLCJyb2xsTm8iOiIyMjg5MWE2NjgzIiwiYWNjZXNzQ29kZSI6Ill6dUplVSIsImNsaWVudElEIjoiMmRjMjZhZWYtZjczYy00MjIyLTgzMDUtZTUyNDhjMDc3YjBhIiwiY2xpZW50U2VjcmV0IjoiRUVZWFROcXhkREdFRGdIdiJ9.Tny31VQkH6wr5eOSHC9XFeYXY-ETkzKAG74-qXU_POU";

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