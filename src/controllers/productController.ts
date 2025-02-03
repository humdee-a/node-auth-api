import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await productService.getProducts();
        res.status(200).json({ 
            message: "Get products successfully",
            data: products
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ 
            message: "Failed to get products!",
            error: err.message
        });
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const product = await productService.getProductById(id);
        res.status(200).json({ 
            message: "Get product successfully",
            data: product
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ 
            message: "Failed to get product!",
            error: err.message
        });
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price } = req.body;
        const product = await productService.createProduct(name, price);
        res.status(201).json({ 
            message: "Create product successfully",
            data: product
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ 
            message: "Failed to create product!",
            error: err.message
        });
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const { name, price } = req.body;
        const product = await productService.updateProduct(id, name, price);
        res.status(200).json({ 
            message: "Update product successfully",
            data: product
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ 
            message: "Failed to update product!",
            error: err.message
        });
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        await productService.deleteProduct(id);
        res.status(200).json({ 
            message: "Delete product successfully"
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ 
            message: "Failed to delete product!",
            error: err.message
        });
    }
}