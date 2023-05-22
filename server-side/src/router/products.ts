import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products';


const productsRouter = express.Router();
productsRouter.use(bodyParser.json());
productsRouter.use(express.urlencoded({ extended: true }));

productsRouter.use(express.static('public'));

// Product API CRUD router

productsRouter.post('/', createProduct);
productsRouter.get('/:id', getProduct);
productsRouter.get('/', getProducts);
productsRouter.patch('/:id', updateProduct);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;
