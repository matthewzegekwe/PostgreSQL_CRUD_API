const { Pool } = require("pg");

// Configure PostgreSQL connection
const pool = new Pool({
    user: "your_db_user",
    host: "localhost",
    database: "your_db_name",
    password: "your_db_password",
    port: 5432, // Default PostgreSQL port
});

pool.on("connect", () => {
    console.log("Connected to the database");
});

module.exports = pool;
