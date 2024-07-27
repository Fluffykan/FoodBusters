import express from 'express';
import cors from 'cors';
import { createAccount, resetPassword, verifyUser, selectAll, selectAllReviews, selectReviewsByRestaurantID, calculateAverageRating, selectStoreImage, uploadImage, getImage, getAllImages, saveUserCreds, getUserCreds, getUserReviews, getRandomStore, setFavorite, removeFavorite, checkFavorite, getFavorites, editProfile, getUsers, updateUserPreference, insertRecommendations, selectRecommendationsByUserId, selectRestaurantsByIds, postReview, getUserReview, editReview, checkLiked, likeReview, unlikeReview, getNumLikes, getStoreName, hashFunction } from './connection.js';


const app = express();
const PORT = 4200;

// Middleware
app.use(express.json());
app.use(cors());


// Get endpoint
app.get('/users', async (req, res) => {
    try {
        const result = await getUsers();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send("unknown error" + error);
    }
});

app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const {email, password_hash} = req.body;
        const result = await verifyUser(email, password_hash);
        const user = result[0];
        console.log(result);
        if (result.length == 0) {
            res.status(401).send("unknown user");
        } else {
            await saveUserCreds(user.id, user.username, user.email, user.password_hash, user.preference, user.points, user.cash, user.userrank)
            res.status(200).send("successful login: " + user.username);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getUserCreds', async (req, res) => {
    try {
        res.status(200).send(getUserCreds().split(','));
    } catch (error) {
        console.error(error);
    }
})

app.post('/createAccount', async (req, res) => {
    try {
        const {username, email, password_hash} = req.body;
        console.log(req.body);
        const p_hash = await hashFunction(password_hash);
        const result = await createAccount(username, email, p_hash);
        console.log(result);
        if (result == 1) {
            res.status(201).send("account created");
        } else {
            res.status(500).send("error" + result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/editProfile',async(req, res) => {
    try {
        const {username, password} = req.body;
        const result = await editProfile(username, password);
        res.status(200).send({affectedRows:result});
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/updateUserCreds", (req, res) => {
    try {
        const {id,username, email, password} = req.body;
        saveUserCreds(id,username, email, password);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
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
        res.json({ averageRating: parseFloat(averageRating) });
    } catch (err) {
        console.error("Error calculating average rating:", err);
        res.status(500).send("Internal Server Error");
    }
});

// For fetching uniqueuser primary key ID
app.post('/uniqueuser', async (req, res) => {
    try {
        const { email, password_hash } = req.body;
        const result = await verifyUser(email, password_hash);
        console.log(result);
        if (result.length > 0) {
            const userId = result[0].id; // Assuming id is the primary key in your users table
            res.status(200).json({ userId });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error retrieving unique user:", error);
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

app.get('/getStoreName', async (req, res) => {
    try {
        const {restaurantId} = req.query;
        const result = await getStoreName(restaurantId);
        res.status(200).send(result[0]);
    } catch (error) {
        res.sendStatus(500);
    }

})

app.post('/uploadImg', async (req, res) => {
    try {
        const {uri, owner} = req.body;
        await uploadImage(uri, owner);
        res.send("done");
    } catch (error) {
        res.status(500).send("error uploading image: " + error);
    }
})

app.get("/getImg/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await getImage(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.get("/getAllImgs/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const result = await getAllImages(email);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/getRandomStore", async (req, res) => {
    try {
        const result = await getRandomStore();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/getUserReviews/:email", async (req, res) => {
    try {
        const {email} = req.params;
        const result = await getUserReviews(email);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}) 

app.get("/getUserReview", async (req, res) => {
    const {restaurantID, username} = req.query;
    console.log(restaurantID + " " + username);
    const result = await getUserReview(restaurantID, username);
    res.status(200).send(result);
})

// endpoint for setting restaurant as favorite
app.post('/setFavorite', async (req, res) => {
    try {
        const {userId, restaurantId} = req.body;
        await setFavorite(restaurantId, userId)
        res.status(200).send("successfully set as favorite");
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/removeFavorite', async (req, res) => {
    try {
        const {userId, restaurantId} = req.body;
        await removeFavorite(restaurantId, userId);
        res.status(200).send("successfully removed from favorite");
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/checkFavorite', async (req, res) => {
    try {
        const {userId, restaurantId} = req.body;
        const [numRows] = await checkFavorite(restaurantId, userId);
        res.status(200).send(numRows);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/getFavorites', async (req, res) => {
    try {
        const {userId} = req.body;
        const restaurants = await getFavorites(userId);
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/postReview", async (req, res) => {
    try {
        const {restaurantId, username, review, rating} = req.body;
        console.log("received");
        postReview(restaurantId, username, review, rating);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
})

app.post('/editReview', async (req, res) => {
    try {
        const {restaurantId, username, review, rating} = req.body;
        console.log("received");
        editReview(restaurantId, username, review, rating);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
})

app.get('/checkLiked', async (req, res) => {
    try {
        const {userId, reviewId} = req.query;
        const result = await checkLiked(reviewId, userId);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
    }
})

app.post('/likeReview', async (req, res) => {
    try {
        const {userId, reviewId} = req.query;
        const result = await likeReview(reviewId, userId);
        if (result == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (error0) {
        res.sendStatus(500);
    }
})

app.post('/unlikeReview', async (req, res) => {
    try {
        const {userId, reviewId} = req.query;
        const result = await unlikeReview(reviewId, userId);
        if (result == 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } catch (error0) {
        res.sendStatus(500);
    }
})

app.get('/getNumLikes', async (req, res) => {
    try {
        const {reviewId} = req.query;
        const result = await getNumLikes(reviewId);
        res.status(200).send(result[0]);
    } catch (error) {
        res.sendStatus(500);
    }
})

app.put('/updatePreference', async (req, res) => {
    const { userId, preference } = req.body;
    try {
        const result = await updateUserPreference(userId, preference);
        res.json({ affectedRows: result });
    } catch (error) {
        console.error('Error updating preference:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*app.post('/recommendations', async (req, res) => {
    try {
      const recommendations = req.body.recommendations;
      await insertRecommendations(recommendations);
      res.status(201).send('Recommendations added successfully');
    } catch (error) {
      console.error('Error adding recommendations', error);
      res.status(500).send('Error adding recommendations');
    }
});*/

app.post('/recommendations', async (req, res) => {
    try {
        const recommendations = req.body.recommendations;
        await insertRecommendations(recommendations);
        res.status(201).send('Recommendations added successfully');
    } catch (error) {
        console.error('Error adding recommendations', error);
        res.status(500).send('Error adding recommendations');
    }
});


app.get('/getUserRecommendations', async (req, res) => {
    const { userId } = req.query;
    try {
        const result = await selectRecommendationsByUserId(userId);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).send("unknown error" + error);
    }
});

app.get('/getRecommendedRestaurants', async (req, res) => {
    try {
        const { stallIds } = req.query;
        const idsArray = stallIds.split(',').map(id => parseInt(id, 10));
        const restaurants = await selectRestaurantsByIds(idsArray);
        res.json(restaurants);
    } catch (error) {
        console.error('Error fetching recommended restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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

