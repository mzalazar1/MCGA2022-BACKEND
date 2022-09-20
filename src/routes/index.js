const express = require("express");

const router = express.Router();
const productsRoutes = require("./products");
//importar proveedores
// const proveedoresRoutes = require("./proveedores");

// => /api...
router.use("/products", productsRoutes);
//ruta de proveedores
//router.use("/proveedores", proveedoresRoutes);


module.exports = router;