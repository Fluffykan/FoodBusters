import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';
import fs from 'fs-extra';
import bcrypt from 'bcrypt';
const saltRound = 10;

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
}).promise();

const imgPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    
    queryFormat: function (query, values) {
        if (!values) return query;
        return query.replace(/\:(\w+)/g,
            function (txt, key) {
            if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
    
            }
            return txt;
            }.bind(this)
        );
    },
}).promise();


export async function verifyUser(email, password) {
    async function comparePassword(pw, database) {
        const match = await bcrypt.compare(pw, database);
        return match;
    }

    const [data] = await pool.query("select * from users where email = ?", [email]);
    console.log(data);  
    const match = comparePassword(password, data[0].password_hash);
    return match ? data : null;
}

/*export async function saveUserCreds(id,username, email, password) {
    fs.writeFileSync("userCreds.txt", `${id},${username},${email},${password}`, {
        flag: "w"
    });
    console.log("written");
}*/

export async function saveUserCreds(id,username, email, password, preference, points, cash, userrank) {
    fs.writeFileSync("userCreds.txt", `${id},${username},${email},${password},${preference},${points},${cash},${userrank}`, {
        flag: "w"
    });
    console.log("written");
}

export function getUserCreds() {
    return fs.readFileSync('./userCreds.txt', {encoding:'utf-8', flag:'r'});
}

// Reads more fields for users

export async function getUsers() {
    const [data] = await pool.query("select * from users");
    return data;
}

export async function createAccount(username, email, password) {
    const [result] = await pool.query("insert into users (username, email, password_hash, preference, points, cash, userrank) values (?, ?, ?, '', 0, 0, 'Apprentice Chef')", [username, email, password]);
    return result.affectedRows;
}

export async function editProfile(username, password) {
    const [result] = await pool.query("update users set password_hash = ? where username = ?", 
        [password, username]);
    return result.affectedRows;
}

export async function resetPassword(email, password) {
    const [result] = await pool.query("update users set password_hash = ? where email = ?", [password, email]);
    return result.affectedRows;
}

// cut-off

export async function selectAll() {
    const [result] = await pool.query("select * from restaurants");
    return result;
}

export async function selectAllReviews() {
    const [result] = await pool.query("select * from reviews");
    return result;
}


export async function selectReviewsByRestaurantID(restaurantID) {
    const [result] = await pool.query("SELECT * FROM reviews WHERE restaurantID = ?", [restaurantID]);
    return result;
}


export async function calculateAverageRating(restaurantID) {
    try {
        const [result] = await pool.query("SELECT AVG(userRating) as averageRating FROM reviews WHERE restaurantID = ?", [restaurantID]);
        return result[0].averageRating;
    } catch (error) {
        const [result] = await pool.query("select storeRating from restaurants where id = ?", [restaurantID]);
        return result[0].storeRating;
    }
    
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

export async function getStoreName(restaurantId) {
    const [result] = await pool.query("select storeName from restaurants where id = ?", [restaurantId]);
    return(result);
}

export async function selectStoreImage(restaurantID) {
    try {
        console.log("Querying for store image with restaurantID:", restaurantID); // Log the restaurantID
        const [result] = await pool.query("SELECT storeImage FROM restaurants WHERE id = ?", [restaurantID]);
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

export async function uploadImage(file, owner) {
    // const data = readImageFile(file);
    // console.log("hi");

    // function readImageFile (file) {
    //     const bitmap = fs.readFileSync(file)
    //     const buf = new Buffer.from(bitmap);
    //     return buf;
    // }

    const [result] = await imgPool.query(`insert into images (image, owner) values (binary(:file), :owner)`, {file, owner});
    console.log(result);
    return result;
}
export async function getImage(id) {
    const [result] = await pool.query(`select image from images where id = ?`, [id]);
    const data = result[0].image;
    console.log(data);
    const buf = new Buffer.from(data, 'binary');
    return buf;
}
export async function getAllImages(email) {
    const [result] = await pool.query(`select i.id from images as i, users as u where u.email = ? and i.owner = u.email`, [email]);
    const index = [];
    result.forEach(x=>index.push(x.id));
    return index;
}

export async function getUserReviews(id) {
    const [result] = await pool.query(`select * from reviews as rev, users as u where u.id = ? and rev.userID = u.username`, [id]);
    return result;
}

export async function getUserReview(restaurantId, username) {
    const [result] = await pool.query("select * from reviews where restaurantID = ? and userID = ?", [restaurantId, username]);
    return result;
}

export async function getRandomStore() {
    const [result] = await pool.query("select count(*) from reviews");
    console.log("count = " + result[0]["count(*)"]);
    const rec = Math.floor(Math.random() * (result[0]["count(*)"]) + 1);
    console.log("rec index = " + rec);
    const [target] = await pool.query(`select storeName from restaurants where id = ${rec}`);
    console.log(target);
    const storeName = target[0].storeName;
    console.log("storename " + storeName);
    const [all] = await pool.query(`select * from restaurants where storeName = ?`, [storeName]);
    console.log(all);
    return all;
}

export async function setFavorite(storeId, userId) {
    const [result] = await pool.query("insert into favorites (userId, restaurantId) values (?, ?)", [userId, storeId])
    return result;
}

export async function removeFavorite(storeId, userId) {
    const [result] = await pool.query("delete from favorites where userId = ? and restaurantId = ?", [userId, storeId])
    return result;
}

export async function checkFavorite(storeId, userId) {
    const [result] = await pool.query("select count(*) as count from favorites where userid = ? and restaurantId = ?", [userId, storeId]);
    return result;
}

export async function getFavorites(userId) {
    const [result] = await pool.query("select res.* from restaurants as res, favorites as fav where fav.userId = ? and fav.restaurantId = res.id", [userId]);
    console.log(result);
    return result;
}

export async function postReview(restaurantID, userID, userReview, userRating) {
    const[result] = await pool.query("insert into reviews (restaurantID, userID, userReview, userRating) values (?,?,?,?)", 
                                        [restaurantID, userID, userReview, userRating]);
    console.log(result.affectedRows);
    return result.affectedRows;
}

export async function editReview(restaurantID, userID, userReview, userRating) {
    const[result] = await pool.query("update reviews set userReview = ?, userRating = ? where restaurantID = ? and userID = ?", 
                                        [userReview, userRating, restaurantID, userID]);
    console.log(result.affectedRows);
}

export async function checkLiked(reviewId, userId) {
    const [result] = await pool.query(`select count(*) as count from upvoted where userId = ? and reviewId = ?`, [userId, reviewId]);
    return result;
}

export async function likeReview(reviewId, userId) {
    const [result] = await pool.query("insert into upvoted (userId, reviewId) values (?, ?)", [userId, reviewId]);
    return result.affectedRows;
}

export async function unlikeReview(reviewId, userId) {
    const [result] = await pool.query('delete from upvoted where userId = ? and reviewId = ?', [userId, reviewId]);
    return result.affectedRows;
}

export async function getNumLikes(reviewId) {
    const [result] = await pool.query('select count(*) as count from upvoted where reviewId = ?', [reviewId]);
    return result;
}


export async function updateUserPreference(userId, preference) {
    const [result] = await pool.query("UPDATE users SET preference = ? WHERE id = ?", [preference, userId]);
    return result.affectedRows;
}

/*export async function insertRecommendations(recommendations) {
    const values = recommendations.map(rec => [rec.recommendby, rec.recommendto, rec.stallid]);
    const [result] = await pool.query("INSERT INTO recommend (recommendby, recommendto, stallid) VALUES ?", [values]);
    return result.affectedRows;
}*/

/*export async function insertRecommendations(recommendations) {
    const values = recommendations.map(rec => [
        rec.recommendby, 
        rec.recommendto, 
        rec.stallid, 
        rec.username, 
        rec.userrank
    ]);
    const [result] = await pool.query("INSERT INTO recommend (recommendby, recommendto, stallid, username, userrank) VALUES ?", [values]);
    return result.affectedRows;
}*/

export async function insertRecommendations(recommendations) {
    const values = recommendations.map(rec => [
        rec.recommendby, 
        rec.recommendto, 
        rec.stallid, 
        rec.username, 
        rec.userrank,
        rec.storeDist,
        rec.storeClassification,
        rec.storeStatus,
        rec.storeName,
        rec.storeAddress,
        rec.storeRating
    ]);
    const [result] = await pool.query(`
        INSERT INTO recommend (
            recommendby, 
            recommendto, 
            stallid, 
            username, 
            userrank,
            storeDist,
            storeClassification,
            storeStatus,
            storeName,
            storeAddress,
            storeRating
        ) VALUES ?`, [values]);
    return result.affectedRows;
}

export async function selectRecommendationsByUserId(userId) {
    const [result] = await pool.query("SELECT * FROM recommend WHERE recommendto = ?", [userId]);
    return result;
}

export async function selectRestaurantsByIds(ids) {
    const [result] = await pool.query("SELECT * FROM restaurants WHERE id IN (?)", [ids]);
    return result;
}

export async function hashFunction(password) {
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
}

export async function deleteRecommendation(id) {
    const [result] = await pool.query("delete from recommend where id = ?", [id]);
}