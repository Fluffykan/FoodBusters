import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
}).promise();

export async function verifyUser(email, password) {
    console.log(email + " " + password);
    const [data] = await pool.query("select * from users where email = ? and password_hash = ?", [email, password]);
    return data;
}

export async function getUsers() {
    const [data] = await pool.query("select * from users");
    return data;
}

export async function createAccount(username, email, password) {
    const [result] = await pool.query("insert into users (username, email, password_hash) values (?, ?, ?)", [username, email, password]);
    return result.affectedRows;
}

export async function resetPassword(email, password) {
    const [result] = await pool.query("update users set password_hash = ? where email = ?", [password, email]);
    return result.affectedRows;
}

// cut-off

export async function selectAll() {
    const [result] = await pool.query("select * from restaurantstest1");
    return result;
}

export async function selectAllReviews() {
    const [result] = await pool.query("select * from reviewscomponent");
    return result;
}


export async function selectReviewsByRestaurantID(restaurantID) {
    const [result] = await pool.query("SELECT * FROM reviewscomponent WHERE restaurantID = ?", [restaurantID]);
    return result;
}


export async function calculateAverageRating(restaurantID) {
    const [result] = await pool.query("SELECT AVG(userRating) as averageRating FROM reviewscomponent WHERE restaurantID = ?", [restaurantID]);
    return result[0].averageRating;
}


/*export async function selectStoreImage(restaurantID) {
    const [result] = await pool.query("SELECT storeImage FROM restaurantstest1 WHERE id = ?", [restaurantID]);
    return result.length > 0 ? result[0].storeImage : null;
}*/

/*export async function selectStoreImage(restaurantID) {
    try {
        const [result] = await pool.query("SELECT storeImage FROM restaurantstest1 WHERE id = ?", [restaurantID]);
        return result.length > 0 ? result[0].storeImage : null;
    } catch (error) {
        console.error("Error selecting store image:", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}*/

export async function selectStoreImage(restaurantID) {
    try {
        console.log("Querying for store image with restaurantID:", restaurantID); // Log the restaurantID
        const [result] = await pool.query("SELECT storeImage FROM restaurantstest1 WHERE id = ?", [restaurantID]);
        console.log("Query result:", result); // Log the query result
        if (result.length > 0 && result[0].storeImage) {
            const base64Image = Buffer.from(result[0].storeImage).toString('base64');
            return `data:image/jpeg;base64,${base64Image}`;
        } else {
            console.warn(`No image found for restaurantID: ${restaurantID}`); // Log if no image is found
            return null;
        }
    } catch (error) {
        console.error("Error selecting store image:", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}
