//################################################
// const pg = require("pg");
// const dotenv = require("dotenv");

// dotenv.config();
// console.log(process.env)
//################################################

// const pool = new pg.Pool({
//     connectionString: process.env.DATABASE_URL, //μεταβλητή περιβάλλοντος
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

// const pool = new pg.Pool();  // to connect to the local database


//################################################
// const { Client } = require('pg');

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'patras-league',
//     password: '24121998',
//     port: 5432
// });

// client.connect((err) => {
//     if (err)
//         throw err;
//     else console.log("connected to db")
// });


// module.exports = client;

'use strict';

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect((err) => {
    // if (err)
    //     throw err;
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
