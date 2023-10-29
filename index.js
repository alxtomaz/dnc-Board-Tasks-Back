const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); // adicionado alex
const swaggerUi = require("swagger-ui-express");
const routes = require("./src/routes");
const authDocProducao = require("./src/middlewares/authDoc");
const swaggerOptions = { customCssUrl: "/swagger-ui.css" };
var app = express();
require("dotenv").config(); // adicionado alex


//config express 
app.use(cors()); // evitar problmeas de integração de backend e frontend
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


//configuração swagger documentação
if (process.env.NODE_ENV !== "test") {
  const swaggerFile = require("./swagger/swagger_output.json");
  app.get("/", (req, res) => {
    /* #swagger.ignore = true */ res.redirect("/doc");
  });
  app.use(
    "/doc",
    swaggerUi.serve,
    authDocProducao,
    swaggerUi.setup(swaggerFile, swaggerOptions)
  );
}


//rotas endpoins api
routes(app);


//inicialização do servidor
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
