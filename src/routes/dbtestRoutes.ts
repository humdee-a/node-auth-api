import express from 'express'

import { pool } from "../config";

const router = express.Router()

router.get('/dbtest', async (req, res) => {
    try {
        const client = await pool.connect();
        // const result = await client.query('SELECT * FROM Users');
        const result = await client.query('SELECT NOW()');
        const results = (result) ? result.rows : null
        // res.json(results);
        client.release();

        res.status(200).json({ 
            message: "Connected database successfully",
            data: results
        });
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ 
            message: "Failed to connect database!",
            error: err.message
        });
    }
})

export default router;