const express = require("express");

const router = express.Router();
const productsRoutes = require("./products");
const proveedRoutes = require("./proveedores");

//importar proveedores
// const proveedoresRoutes = require("./proveedores");

// => /api...
router.use("/products", productsRoutes);
router.use("/proveedores", proveedRoutes);
//ruta de proveedores
//router.use("/proveedores", proveedoresRoutes);


module.exports = router;