
const { v4: uuidv4 } = require("uuid");

const urlStore = {};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

function generateUniqueCode() {
  let code = uuidv4().slice(0, 6);
  while (urlStore[code]) {
    code = uuidv4().slice(0, 6);
  }
  return code;
}

module.exports = {
  urlStore,
  isValidUrl,
  generateUniqueCode,
};