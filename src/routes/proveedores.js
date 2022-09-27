const router = require("express").Router();
const proveedControllers = require("../controllers/proveedores");

// => /api/proveed...
router.get("/", proveedControllers.getAllProve);
router.post("/add", proveedControllers.createProve);
router.put("/update/:id", proveedControllers.actualizarProve);
router.delete("/delete/:id", proveedControllers.eliminarProve);
router.patch("/undeleted/:id", proveedControllers.unDeletedProve);

module.exports = router;