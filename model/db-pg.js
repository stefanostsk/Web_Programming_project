//################################################
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
// console.log(process.env)
//################################################

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL, //μεταβλητή περιβάλλοντος
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

// const pool = new pg.Pool();  // to connect to the local database




'use strict';

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((err) => {
    if (err)
        throw err;
});

module.exports = client

//################################################


// // import pg from "pg";
// // import dotenv from "dotenv";

// const pg = require("pg");
// const dotenv = require("dotenv");

// dotenv.config();
// // console.log(process.env)

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL, //μεταβλητή περιβάλλοντος
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

// // const pool = new pg.Pool();  // to connect to the local database


// // εναλλακτικά...
// // const pool = new pg.Pool({
// //     user: ///username,
// //     host: 'localhost',
// //     database: 'books',
// //     password: /// password,
// //     port: 5432,
// // })

// async function connect() {
//     try {
//         const client = await pool.connect();
//         return client
//     }
//     catch(e) {
//         console.error(`Failed to connect ${e}`)
//     }
// }
