const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();




app.use(cors());
app.use(express.json()); // permite leer req.body como JSON; sin esto, req.body sería undefined
app.use(express.static(path.join(__dirname, "../../public"))); // Para mas seguridad, se usa path join
app.use("/api/auth",    require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipes"));

app.get("/", (req, res) => {
  // Lo redirigimos a la nueva URL
  res.redirect("/cocinaItaliana");
});

// Alguien visita http://localhost:4000/cocinaitaliana
app.get("/cocinaItaliana", (req, res) => {
  // Redirige al archivo principal de la página
  res.redirect("/index.html");
});

module.exports = app; // Exporta la app para usarla en server.js

