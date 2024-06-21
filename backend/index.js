import express from 'express';
import cors from 'cors';
import { createAccount, getUsers, resetPassword, verifyUser, selectAll, selectAllReviews, selectReviewsByRestaurantID, calculateAverageRating, selectStoreImage } from './connection.js';

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

// New endpoint for fetching all reviews
app.get('/allreviews', async (req, res) => {
    try {
        const result = await selectAllReviews();
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send("unknown error" + error);
    }
})

// New endpoint for fetching reviews by restaurantID
app.get('/reviews', async (req, res) => {
    try {
        const { restaurantID } = req.query;
        console.log("Received restaurantID:", restaurantID);  // Log the received restaurantID

        const result = await selectReviewsByRestaurantID(restaurantID);
        console.log("Reviews found:", result);  // Log the result of the query
        //console.log(result);
        res.send(result);
    } catch (error) {
        console.error("Error occurred:", error);  // Log any errors
        res.status(500).send("unknown error" + error);
    }
});

// New endpoint for calculating the average rating made for the specific restaurant
app.get('/averageRating', async (req, res) => {
    const restaurantID = req.query.restaurantID;

    try {
        const averageRating = await calculateAverageRating(restaurantID);
        res.json({ averageRating });
    } catch (err) {
        console.error("Error calculating average rating:", err);
        res.status(500).send("Internal Server Error");
    }
});

// New endpoint for fetching the store image by restaurantID
/*app.get('/storeImage', async (req, res) => {
    try {
        const { restaurantID } = req.query;
        console.log("Received request for store image with restaurantID:", restaurantID); // Log the received restaurantID
        const storeImage = await selectStoreImage(restaurantID);
        if (storeImage) {
            res.json({ storeImage });
        } else {
            res.status(404).send("Store image not found");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("unknown error" + error);
    }
});*/

app.get('/storeImage', async (req, res) => {
    try {
        const { restaurantID } = req.query;
        if (!restaurantID) {
            return res.status(400).send("Bad Request: Missing restaurantID"); // Return 400 for bad request
        }
        console.log("Received request for store image with restaurantID:", restaurantID); // Log the received restaurantID
        const storeImage = await selectStoreImage(restaurantID);
        if (storeImage) {
            res.json({ storeImage });
        } else {
            res.status(404).send("Store image not found");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error: " + error.message);
    }
});



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

