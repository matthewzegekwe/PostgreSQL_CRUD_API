const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// GET a specific user
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
});

// POST a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const result = await pool.query(
            "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
            [name, email, age]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

// PUT to update a user
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
            [name, email, age, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

module.exports = router;
