import express from 'express'
import products from 'router/products';
import { Product } from "../database/product"

// Create products

export const createProduct = async(req: express.Request, res: express.Response) =>{
	try{
		const product = new Product({
			id: req.body.id,
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			discountPercentage: req.body.discountPercentage,
			rating: req.body.rating,
			stock: req.body.stock,
			brand: req.body.brand,
			category: req.body.category,
			thumbnail: req.body.thumbnail,
			images: req.body.images
		});

		const product_data = await product.save();
		
		res.status(200).send({msg: 'Product created successfully', products: product_data});
	}catch(error){
		res.status(400).send({success: false, msg: 'Error creating product'});
	}
}

// Read/get products

export const getProducts = async(req: express.Request, res: express.Response) => {
  try {
    const products = await Product.find();
    res.status(200).send({ products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, msg: 'Server error' });
  }
};

// Read/get product by id

export const getProduct = async(req: express.Request, res: express.Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ success: false, msg: 'Product not found' });
    }
    res.status(200).send({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, msg: 'Server error' });
  }
};

// Update Product by id

export const updateProduct = async(req: express.Request, res: express.Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ success: false, msg: 'Product not found' });
    }

    // Update product properties
    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    product.discountPercentage = req.body.discountPercentage;
    product.rating = req.body.rating;
    product.stock = req.body.stock;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.thumbnail = req.body.thumbnail;

    const updatedProduct = await product.save();
    res.status(200).send({ updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, msg: 'Server error' });
  }
};

// Delete product by Id

export const deleteProduct = async(req: express.Request, res: express.Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ success: false, msg: 'Product not found' });
    }

    await product.deleteOne({id: product.id});
    res.status(200).send({ success: true, msg: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, msg: 'Server error' });
  }
};
