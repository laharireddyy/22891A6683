const express = require("express");
const router = express.Router();
const { urlStore, isValidUrl, generateUniqueCode } = require("../services/urlStore");
const { Log } = require("../../LoggingMiddleware");

const PORT = 3000;

router.post("/", async (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!isValidUrl(url)) {
    await Log("backend", "error", "route", `Invalid URL: ${url}`);
    return res.status(400).json({ error: "Invalid URL format" });
  }

  const ttl = Number.isInteger(validity) ? validity : 30;
  const createdAt = new Date();
  const expiryAt = new Date(createdAt.getTime() + ttl * 60_000);

  let code = shortcode;
  if (code) {
    if (urlStore[code]) {
      await Log("backend", "warn", "route", `Shortcode collision: ${code}`);
      return res.status(409).json({ error: "Shortcode already in use" });
    }
  } else {
    code = generateUniqueCode();
  }

  urlStore[code] = {
    url,
    createdAt,
    expiryAt,
    clicks: [],
  };

  await Log("backend", "info", "route", `Created shortcode: ${code}`);

  res.status(201).json({
    shortLink: `http://localhost:${PORT}/${code}`,
    expiry: expiryAt.toISOString(),
  });
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const record = urlStore[code];

  if (!record) {
    await Log("backend", "warn", "route", `Stats lookup failed: ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > record.expiryAt) {
    await Log("backend", "info", "route", `Shortcode expired: ${code}`);
    return res.status(410).json({ error: "Link expired" });
  }

  const click = {
    timestamp: new Date().toISOString(),
    referrer: req.get("Referrer") || null,
    geo: "Unknown", 
  };
  record.clicks.push(click);

  await Log("backend", "debug", "route", `Recorded click for: ${code}`);

  res.json({
    originalUrl: record.url,
    createdAt: record.createdAt.toISOString(),
    expiryAt: record.expiryAt.toISOString(),
    clickCount: record.clicks.length,
    clicks: record.clicks,
  });
});
router.get("/:code/redirect", async (req, res) => {
  const { code } = req.params;
  const record = urlStore[code];

  if (!record) {
    await Log("backend", "warn", "route", `Redirect failed: ${code}`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  if (new Date() > record.expiryAt) {
    await Log("backend", "info", "route", `Redirect expired: ${code}`);
    return res.status(410).json({ error: "Link expired" });
  }

  const click = {
    timestamp: new Date().toISOString(),
    referrer: req.get("Referrer") || null,
    geo: "Unknown",
  };
  record.clicks.push(click);

  await Log("backend", "debug", "route", `Redirected: ${code}`);

  res.redirect(record.url);
});

module.exports = router;
