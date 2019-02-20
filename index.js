const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

const checkQuery = (req, res, next) => {
  const { age } = req.query;

  if (!age) return res.redirect("/");

  return next();
};

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/major", checkQuery, (req, res) => {
  let { age } = req.query;
  return res.render("major", { age });
});

app.get("/minor", checkQuery, (req, res) => {
  let { age } = req.query;
  return res.render("minor", { age });
});

app.post("/check", (req, res) => {
  let { age } = req.body;

  if (age < 18) res.redirect(`/minor?age=${age}`);

  res.redirect(`/major?age=${age}`);
});

app.listen(3000);
