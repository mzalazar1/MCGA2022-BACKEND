const Provee = require("../models/proveedores");

// Devuelve todos los proveedores
const getAllProve = async (req, res) => {

    let proveedores = [];

    try {
        proveedores = await Provee.find({ isDeleted: false })
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolvemos los proveedores sino se entro al catch
    res.json(proveedores);
};

// POST de Proveedores
const createProve = async (req, res) => {

    const { id, name, description, isDeleted } = req.body;

    const producto = new Provee({
        id,
        name,
        description,
        isDeleted,
    });
    let savedProvee;
    try {
        savedProvee = await producto.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedProvee);

};

// UPDATE de prove
const actualizarProve = async (req, res) => {
    const id = req.params.id;
    const { name, description, isDeleted } = req.body;
    console.log(id);

    let proveedorAct;
    try {
        proveedorAct = await Provee.findByIdAndUpdate(
            { "id": id },
            {
                $set: {
                    name: name,
                    description: description,
                    isDeleted: isDeleted,
                }
            },
            { new: true }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }
    if (proveedorAct.length === 0) return res.status(404).json({ msg: `no existe proveedor con  id: ${id}` });
    return res.json(proveedorAct);
};

// DELETE prove
const eliminarProve = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Provee.findByIdAndUpdate({ id }, { isDeleted: true }, { new: true });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.status(404).json({ msg: `No se encontro producto con id: ${id}` });
    }

    return res.json({ msg: `El producto borrado ${id}` });
}

const unDeletedProve = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Provee.findByIdAndUpdate({ id }, { isDeleted: false }, { new: true });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.status(404).json({ msg: `No se encontro producto con id: ${id}` });
    }

    return res.json({ msg: `El producto borrado ${id}` });
}

module.exports = {
    getAllProve,
    createProve,
    actualizarProve,
    eliminarProve,
    unDeletedProve,
}; 