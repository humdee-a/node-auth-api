import { pool } from "../config"

import Product from '../models/productModel'

interface IProduct {
    id: number;
    name: string;
    price: number;
}

export const getProducts = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products');
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductById = async (id: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE id = $1', [id]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createProduct = async (name: string, price: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO Products (name, price) VALUES ($1, $2) RETURNING *', [name, price]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createProduct2 = async (name: string, price: number): Promise<IProduct> => {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO Products (name, price) VALUES ($1, $2) RETURNING *', [name, price]);
        client.release();

        return new Product(
            result.rows[0].id, 
            result.rows[0].name, 
            result.rows[0].price
        );
}

export const updateProduct = async (id: number, name: string, price: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE Products SET name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, id]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteProduct = async (id: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM Products WHERE id = $1 RETURNING *', [id]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsWithPagination = async (limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products LIMIT $1 OFFSET $2', [limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsCount = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT COUNT(*) FROM Products');
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategory = async (category: string) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1', [category]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByPriceRange = async (min: number, max: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE price >= $1 AND price <= $2', [min, max]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryAndPriceRange = async (category: string, min: number, max: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 AND price >= $2 AND price <= $3', [category, min, max]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByKeyword = async (keyword: string) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE name ILIKE $1', [`%${keyword}%`]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryAndKeyword = async (category: string, keyword: string) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 AND name ILIKE $2', [category, `%${keyword}%`]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByPriceRangeAndKeyword = async (min: number, max: number, keyword: string) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE price >= $1 AND price <= $2 AND name ILIKE $3', [min, max, `%${keyword}%`]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryAndPriceRangeAndKeyword = async (category: string, min: number, max: number, keyword: string) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 AND price >= $2 AND price <= $3 AND name ILIKE $4', [category, min, max, `%${keyword}%`]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryAndPriceRangeAndKeywordWithPagination = async (category: string, min: number, max: number, keyword: string, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 AND price >= $2 AND price <= $3 AND name ILIKE $4 LIMIT $5 OFFSET $6', [category, min, max, `%${keyword}%`, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryAndPriceRangeWithPagination = async (category: string, min: number, max: number, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 AND price >= $2 AND price <= $3 LIMIT $4 OFFSET $5', [category, min, max, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryWithPagination = async (category: string, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 LIMIT $2 OFFSET $3', [category, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByPriceRangeWithPagination = async (min: number, max: number, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE price >= $1 AND price <= $2 LIMIT $3 OFFSET $4', [min, max, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByKeywordWithPagination = async (keyword: string, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE name ILIKE $1 LIMIT $2 OFFSET $3', [`%${keyword}%`, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByPriceRangeAndKeywordWithPagination = async (min: number, max: number, keyword: string, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE price >= $1 AND price <= $2 AND name ILIKE $3 LIMIT $4 OFFSET $5', [min, max, `%${keyword}%`, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductsByCategoryAndKeywordWithPagination = async (category: string, keyword: string, limit: number, offset: number) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Products WHERE category = $1 AND name ILIKE $2 LIMIT $3 OFFSET $4', [category, `%${keyword}%`, limit, offset]);
        const results = (result) ? result.rows : null;
        client.release();

        return results;
    } catch (error) {
        console.log(error);
        return null;
    }
}