const Product = require('../models/Product')
const dotenv = require('dotenv')
const { upload } = require('../middleware/uploadFile')

exports.products = async (req, res, next) => {
    return res.status(200).json({ success: true, message: "Products retrived successfully" });
}

//add new product
exports.createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProudct = new Product(productData);

        const product = await newProudct.save();
        if (!product) {
            return res.json({ success: false, message: "Product creation failed" })
        }
        return res.status(201).json({ success: true, data: product, message: "Product added successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}

//update product
exports.updateProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: productData }, { new: true });
        if (!updatedProduct) return res.status(400).json({ sucess: false, message: "Product details update failed" });

        //return success response
        return res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Successfully updated product details"
        })
    } catch (error) {
        return res.status(500).json({ sucess: false, message: error.message })
    }
}