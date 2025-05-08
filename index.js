const express = require("express");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON
app.use("/users", usersRouter); // Users routes

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
