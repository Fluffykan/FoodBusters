import express from 'express';
import cors from 'cors';
import { createAccount, getUsers, resetPassword, verifyUser, selectAll } from './connection.js';

const app = express();
const PORT = 4200;

// Middleware
app.use(express.json());
app.use(cors());


// Get endpoint
app.post('/login', async (req, res) => {
    try {
        console.log(req.params)
        const {email, password_hash} = req.body;
        const [result] = await verifyUser(email, password_hash);
        console.log(result);
        if (result == undefined) {
            res.status(401).send("unknown user");
        } else {
            res.status(200).send("successful login: " + result.username);
        }
    } catch (error) {
        res.status(500).send("something broke", error)
    }
});

app.post('/createAccount', async (req, res) => {
    try {
        const {username, email, password_hash} = req.body;
        const result = await createAccount(username, email, password_hash);
        console.log(result);
        if (result == 1) {
            res.status(201).send("account created");
        } else {
            res.status(500).send("error" + result);
        }
    } catch (error) {
        res.status(500).send("unknown error");
    }
})

app.post('/resetPassword', async (req, res) => {
    try {
        const {email, password_hash} = req.body;
        const result = await resetPassword(email, password_hash);
        if (result == 1) {
            res.status(200).send("password reset");
        } else {
            res.status(500).send("error" + result);
        }
    } catch (error) {
        res.status(500).send("unknown error");
    }
})

app.get('/restaurants', async (req, res) => {
    try {
        const result = await selectAll();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send("unknown error" + error);
    }
  })

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: err.code
    })
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));

// ROOT URL = 'http://192.168.1.15:4200/'
// CHANGE IF SERVER # IS CHANGED

