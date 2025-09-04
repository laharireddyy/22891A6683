const axios = require("axios");
let token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJsYWhhcmllcHBhbGFwYWxsaUBnbWFpbC5jb20iLCJleHAiOjE3NTY5NjY3MjEsImlhdCI6MTc1Njk2NTgyMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijk5OTg1NTZiLWM5MGMtNDUyNi04MDAwLWViMjg4Y2M0NGRkZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImVwcGFsYXBhbGxpIGxhaGFyaSIsInN1YiI6IjJkYzI2YWVmLWY3M2MtNDIyMi04MzA1LWU1MjQ4YzA3N2IwYSJ9LCJlbWFpbCI6ImxhaGFyaWVwcGFsYXBhbGxpQGdtYWlsLmNvbSIsIm5hbWUiOiJlcHBhbGFwYWxsaSBsYWhhcmkiLCJyb2xsTm8iOiIyMjg5MWE2NjgzIiwiYWNjZXNzQ29kZSI6Ill6dUplVSIsImNsaWVudElEIjoiMmRjMjZhZWYtZjczYy00MjIyLTgzMDUtZTUyNDhjMDc3YjBhIiwiY2xpZW50U2VjcmV0IjoiRUVZWFROcXhkREdFRGdIdiJ9.Tny31VQkH6wr5eOSHC9XFeYXY-ETkzKAG74-qXU_POU";


function configure({ bearerToken }) {
  token = bearerToken;
}

async function Log(stack, level, pkg, message) {
  const payload = { stack, level, package:pkg, message };
  console.log("LOG PAYLOAD", payload);
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      payload,
      { headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        } }
    );
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}

module.exports = { configure, Log };