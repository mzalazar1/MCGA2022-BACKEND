// let productsJson = require('../../data/products.json');
const Product = require("../models/products");

// Devuelve todos los productos
const getAll = async (req, res) => {
    // Product.find()
    // .then((data) => res.json({ data }))
    // .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));

    // crea un array vacio por si la base de datos no tiene ningun producto
    // uso let y dentro del try reasigno el valor    
    let products = [];

    try {
        products = await Product.find({})
    } catch (error) {
        console.log(error);
        res.status(500);
        res.json({ msg: `Error: ${error}` });
    }

    // solo devolvemos los productos sino se entro al catch
    res.json(products);
};

// POST de Productos
const create = async (req, res) => {

    //forma clasica
    // const id = req.body.id;
    // const name = req.body.name;
    // const description = req.body.description;
    // const isDeleted = req.body.isDeleted;
    const { id, name, description, isDeleted } = req.body;

    const producto = new Product({
        id,
        name,
        description,
        isDeleted,
    });
    let savedProduct;
    try {
        savedProduct = await producto.save();
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Post: ${err}` });
    }

    res.json(savedProduct);

};

// UPDATE de productos
const actualizarProd = async (req, res) => {
    const id = req.params.id;
    const { name, description, isDeleted } = req.body;
    console.log(id);

    let productoAct;
    try {
        productoAct = await Product.updateOne(
            { "id": id },
            {
                $set: {
                    name: name,
                    description: description,
                    isDeleted: isDeleted,
                }
            }
        );
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Update: ${err}` });
    }
    res.json(productoAct);
};

// DELETE de productos
const eliminarProd = async (req, res) => {
    const id = req.params.id;
    let response;
    try {
        response = await Product.deleteOne({ id });
        console.log(response);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.json({ msg: `Error Delete: ${err}` });
    }
    if (response.deletedCount === 0) {
        return res.json({ msg: `No se encontro producto con id: ${id}` });
    }

    return res.json({ msg: `El producto borrado ${id}` });
}

// (req,res) => {
//     const newProd ={
//         id: req.body.id,
//         name: req.body.name,
//         price: req.body.price,
//     };
//     if(!newProd.id) {
//         res.sendStatus(400);
//     }
//     products.push(newProd);
//     fs.writeFile("./data/prodcuts.js", JSON.stringify(products),(err) => {
//         //if (err) { res.SendError( 500, 'Error while saving data');}
//     });
//     res.json(newProd);
// }

// Product.create(newProduct)
//     .then((data) => res.json({ msg: "Profile added: ", data }))
//     .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));


module.exports = {
    getAll,
    create,
    actualizarProd,
    eliminarProd,
};