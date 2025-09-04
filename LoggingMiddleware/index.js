const axios = require("axios");
let token ="";


function configure({ bearerToken }) {
  token = bearerToken;
}

async function Log(stack, level, pkg, message) {
  const payload = { stack, level, package:pkg, message };
  console.log("LOG PAYLOAD", payload);
  await axios.post(
    "http://20.244.56.144/evaluation-service/logs",
    payload,
    { headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      } }
  );
}

module.exports = { configure, Log };