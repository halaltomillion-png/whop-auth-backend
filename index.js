import express from "express";

const app = express();

// ENV VARS
const CLIENT_ID = process.env.WHOP_CLIENT_ID;
const REDIRECT_URI = process.env.WHOP_REDIRECT_URI;

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend läuft");
});

// LOGIN START
app.get("/login", (req, res) => {
  const whopUrl =
    "https://whop.com/oauth/authorize" +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=read_user` +
    `&product_id=prod_LWv6cXhf3FDRE`;

  res.redirect(whopUrl);
});

// CALLBACK VON WHOP ✅
app.get("/callback", (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send("Kein Code erhalten");
  }

  res.send(`
    <h1>Login erfolgreich</h1>
    <p>OAuth Code:</p>
    <pre>${code}</pre>
  `);
});

export default app;
