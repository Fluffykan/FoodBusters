import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';
import fs from 'fs-extra';

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
    console.log(email + " " + password);
    const [data] = await pool.query("select * from users where email = ? and password_hash = ?", [email, password]);
    console.log(data);  
    return data;
}

export async function saveUserCreds(id,username, email, password) {
    fs.writeFileSync("userCreds.txt", `${id},${username},${email},${password}`, {
        flag: "w"
    });
    console.log("written");
}

export function getUserCreds() {
    return fs.readFileSync('./userCreds.txt', {encoding:'utf-8', flag:'r'});
}

export async function getUsers() {
    const [data] = await pool.query("select * from users");
    return data;
}

export async function createAccount(username, email, password) {
    const [result] = await pool.query("insert into users (username, email, password_hash) values (?, ?, ?)", [username, email, password]);
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
    const [result] = await pool.query("SELECT AVG(userRating) as averageRating FROM reviews WHERE restaurantID = ?", [restaurantID]);
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
    const [result] = await pool.query("select res.* from restaurants as res, favorites as fav where fav.userId = 1 and fav.restaurantId = res.id", [userId]);
    console.log(result);
    return result;
}