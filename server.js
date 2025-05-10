const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "userData"
});

// Connect to the database
client.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the PostgreSQL database!");
});

app.get('/users', (req, res) => {
    client.query('SELECT * FROM login', (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error fetching data");
        } else {
            res.status(200).json(result.rows);
        }
    });
});


app.post('/registerUser', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES ($1,$2,$3)";
    const values = [req.body .name, req.body.email, req.body.password];
    console.log("values print", req.body.name, req.body.email, req.body.password)
    console.log("value", req.body)
    client.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).send("Error inserting data");
        } else {
            res.status(200).send("User registered successfully");
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = $1 AND password = $2";
    const values = [req.body.email, req.body.password];

    client.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error fetching data");
        } else if (result.rows.length > 0) {
            res.status(200).json({ message: "Login successful", user: result.rows[0] });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    });
});


app.listen(5005, () => {
    console.log("Server is running on port 5005");
});


