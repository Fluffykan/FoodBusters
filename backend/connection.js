import mysql from 'mysql2';
import dotenv from 'dotenv';
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