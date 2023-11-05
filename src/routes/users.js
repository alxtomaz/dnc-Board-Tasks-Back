const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const router = express.Router();

/* GET users listing. */
router.get('/', conectarBancoDados, function(req, res, next) {
  res.send('respond with a resource '+ process.env.NODE_ENV);
});

module.exports = router;
