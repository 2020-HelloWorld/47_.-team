const expressTypes = require("express");
const mysqlTypes = require("mongoTypes");
const MongoClient = require('mongodb').MongoClient
let ConnectionURL = config.get('database');

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// define the controller
const controller = {
  hello: (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    // call the model
    const data = { data: "Hello World!" };
    // send the response
    res.send(data);
  },
  verifyToken: (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    /** @type {mysqlTypes.Pool}  */
    const db = req.app.get("db");
    let token = req.query.token || "";
    db.query(
      `select username from sessions where token="${token}";`,
      async (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err.sqlMessage });
        }
        if (rows.length === 0) {
          return res.status(401).json({ error: "Invalid token" });
        }
        // get users name from profile

        db.query(
          `select name from profile where username="${rows[0].username}";`,
          async (err, rows1, fields) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: err.sqlMessage });
            }
            if (rows1.length === 0) {
              return res.status(401).json({ error: "Invalid token" });
            }
            return res.status(200).json({
              token: token,
              username: rows[0].username,
              name: rows1[0].name,
            });
          }
        );
      }
    );
  },
  isLoggedIn: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res,
    next
  ) => {
    // await delay(1000);

    /** @type {mysqlTypes.Pool}  */
    const db = req.app.get("db");
    console.log(req.url);
    db.query(
      `select username from sessions where token="${req.body.token || ""}";`,
      async (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err.sqlMessage });
        }
        if (rows.length === 0) {
          return res.status(401).json({ error: "Invalid token" });
        }

        req.body.username = rows[0].username;
        next();
      }
    );
  },
  login: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    // await delay(1000);
    let { username, password, privilege } = req.body;
    privilege = privilege ? privilege : "USER";
    /** @type {mysqlTypes.Pool}  */
    const db = req.app.get("db");
    // console.log(username, password);
    db.query(
      "SELECT role FROM credentials WHERE username = ? AND password = ?",
      [username || "", password || ""],
      (err, rowsM, fields) => {
        if (err) {
          // console.log('Error: ',err.sqlMessage);
          return res.status(500).json({ token: null, error: err.sqlMessage });
        }
        if (rowsM.length === 0) {
          // console.log('Error: Invalid username or password');
          return res
            .status(401)
            .json({ token: null, error: "Invalid username or password" });
        }

        if (rowsM[0].role !== "ADMIN" && privilege === "ADMIN") {
          return res
            .status(401)
            .json({ token: null, error: "Invalid privilege" });
        }
        // console.log(rowsM.length);
        db.query(
          `select name, username, card_number from profile where username="${username}"; `,
          async (err, rows, fields) => {
            if (err) {
              // console.log('Error: ',err.sqlMessage);
              return res
                .status(500)
                .json({ token: null, error: err.sqlMessage });
            }
            // generate a token and insert it into sessions table
            const { generateApiKey } = require("generate-api-key");
            const token = generateApiKey({
              method: "string",
              pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
              length: 50,
            });

            await db.query(
              `insert into sessions (username, token) values ("${username}", "${token}") on DUPLICATE KEY update token="${token}";`
            );

            return res.json({ ...rows[0], ...rowsM[0], token });
          }
        );
      }
    );
  },
  fetchBalance: async (
    /** @type {expressTypes.Request} */ req,
    /** @type {expressTypes.Response} */ res
  ) => {
    let { username } = req.body;
    /** @type {mysqlTypes.Pool}  */
    const db = req.app.get("db");

    db.query(
      `select balance from profile where username="${username}";`,
      async (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res.json({ error: err.sqlMessage });
        }

        console.log(rows[0]);

        // check if user is already in
        if (rows.length === 0) {
          return res({ error: "Something went wrong" });
        }

        return res.json({
          token: null,
          error: null,
          balance: rows[0]?.balance,
        });
      }
    );
  },

};

// export the controller
module.exports = controller;

// select cast(substring_index ("-7,0",',',1) AS int)+5 AS STRING;
