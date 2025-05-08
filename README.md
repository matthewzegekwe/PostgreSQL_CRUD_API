# PostgreSQL_CRUD_API

# How to Run the Project

Follow these steps to set up and run the project locally:

---

## 1. Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v14 or later): Download from [Node.js official website](https://nodejs.org/).
- **PostgreSQL** (v12 or later): Download from [PostgreSQL official website](https://www.postgresql.org/download/).
- A code editor like **VS Code** (optional).

---

## 2. Clone or Set Up the Project

1. Create a new directory for the project.
2. Copy the provided files (`index.js`, `db.js`, `routes/users.js`) into the directory.
3. Initialize the project by running:
   ```bash
   npm init -y
   ```
4. Install the required dependencies:
   ```bash
   npm install express pg
   ```

---

## 3. Set Up the Database

### Start PostgreSQL:
- For Windows/MacOS: Use the PostgreSQL server launcher.
- For Linux: Run:
  ```bash
  sudo service postgresql start
  ```

### Access PostgreSQL CLI:
```bash
psql -U postgres
```

### Create a Database:
```sql
CREATE DATABASE your_db_name;
```

### Switch to the Database:
```sql
\c your_db_name;
```

### Create the `users` Table:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    age INTEGER
);
```

### (Optional) Insert Sample Data:
```sql
INSERT INTO users (name, email, age) VALUES 
('Alice', 'alice@example.com', 25),
('Bob', 'bob@example.com', 30),
('Charlie', 'charlie@example.com', 35);
```

### Verify Data:
```sql
SELECT * FROM users;
```

---

## 4. Configure Database Connection

1. Open `db.js` and update the PostgreSQL connection details:
   ```javascript
   const pool = new Pool({
       user: "your_db_user",       // Your PostgreSQL username (default: postgres)
       host: "localhost",          // Hostname (default: localhost)
       database: "your_db_name",   // Name of your database
       password: "your_db_password", // Your PostgreSQL password
       port: 5432                  // Default PostgreSQL port
   });
   ```

---

## 5. Start the Server

1. Run the server:
   ```bash
   node index.js
   ```
2. The server will start at `http://localhost:3000`.

---

## 6. Test the API

Use **Postman**, **cURL**, or any HTTP client to test the API endpoints:

### GET `/users`
Retrieve all users.
```bash
curl http://localhost:3000/users
```

### GET `/users/:id`
Retrieve a specific user by ID.
```bash
curl http://localhost:3000/users/1
```

### POST `/users`
Add a new user. Use a JSON body like:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "age": 28
}
```
Example cURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe", "email":"john.doe@example.com", "age":28}' http://localhost:3000/users
```

### PUT `/users/:id`
Update a user by ID. Use a JSON body like:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 30
}
```
Example cURL:
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name":"Jane Doe", "email":"jane.doe@example.com", "age":30}' http://localhost:3000/users/1
```

### DELETE `/users/:id`
Delete a user by ID.
```bash
curl -X DELETE http://localhost:3000/users/1
```

---

## 7. Troubleshooting

- **Error: Unable to connect to the database**:
  Check your PostgreSQL credentials and make sure the server is running.

- **Port 3000 is already in use**:
  Either stop the other service using port 3000 or change the port in `index.js`.

- **"User not found" or similar errors**:
  Ensure the database and table are properly set up, and test with valid data.

---
