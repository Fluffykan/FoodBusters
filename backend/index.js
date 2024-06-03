const con = require('./connection.js');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4200;

// Middleware
app.use(cors());
app.use(express.json());

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: err.code
    })
});

// Get endpoint
app.get('/:table_name', (req, res) => {
    const table_name = req.params.table_name;
    con.query("SELECT * FROM ??", [table_name], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send(result);
        }
    });
});

// Get endpoint
app.get('/', (req, res) => {
    con.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send(result);
        }
    });
});

// GET endpoint: LOGIN ATTEMPT 
app.get('/loginAttempt/:email', (req, res) => {
    const data = req.params.email;
    con.query("select password_hash from users where email = ?", [data], (err, result) => {
        if (err) {
            res.send('login attempt error');
        } else {
            res.send(result);
        }
    })
})


// POST endpoint createAccount for new user
app.post('/', (req, res) => {
    const data = req.body;
    // Assuming data validation is done before inserting into the database
    con.query("INSERT INTO users SET ?", data, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send(result);
        }
    });
});

// PUT endpoint
app.put('/updateCustomers/:id', (req, res) => {
    const { name, address } = req.body;
    const { id } = req.params;
    // Assuming data validation is done before updating the database
    con.query("UPDATE customers SET name = ?, address = ? WHERE id = ?", [name, address, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send(result);
        }
    });
});

// PUT endpoint: RESET PASSWORD
app.put('/resetPassword/', (req, res) => {
    const {password_hash, email} = req.body;
    // Assuming data validation is done before updating the database
    con.query("UPDATE users SET password_hash = ? WHERE email = ?", [password_hash, email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send(result);
        }
    });
});

// DELETE endpoint
app.delete('/:id', (req, res) => {
    const studentId = req.params.id;
    con.query("DELETE FROM customers WHERE id = ?", [studentId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send(result);
        }
    });
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));

// ROOT URL = 'http://192.168.1.15:4200/'
// CHANGE IF SERVER # IS CHANGED