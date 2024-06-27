import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(bodyParser.json());

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: 3306,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer
//const users = []
//const accounts = []
//const sessions = []

// Din kod här. Skriv dina routes:

//Skapa konto
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const id = generateOTP();
  const queryUser =
    "INSERT INTO users (id, username, password) VALUES (?, ?, ?)";
  const queryAccount =
    "INSERT INTO accounts (id, username, amount) VALUES (?, ?, 0)";

  console.log(`Creating user: ${username}`);
  try {
    await connection.query(queryUser, [id, username, password]);
    await connection.query(queryAccount, [id, username]);
  } catch (error) {
    console.log(error);
  }

  res.send("Post data received: " + JSON.stringify(req.body));
});

//Logga in
app.post("/sessions", async (req, res) => {
  const { username, password } = req.body;
  //kolla om namn + pass finns
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  try {
    const [result, fields] = await connection.query(query, [
      username,
      password,
    ]);
    if (result.length === 0) {
      res.status(401).send("Try again loser, wrong user");
      return;
    }
  } catch (error) {
    console.log(error);
  }
  const onetimepass = generateOTP();
  //skapa en session
  const sessionQuery =
    "INSERT INTO sessions (username, onetimepass) VALUES (?, ?)";
  try {
    await connection.query(sessionQuery, [username, onetimepass]);
  } catch (error) {
    console.log(error);
  }

  console.log("User account:" + JSON.stringify(username));

  res.json({ onetimepass });
});

// Show saldo
app.post("/me/accounts", async (req, res) => {
  const { onetimepass } = req.body;

  const query = "SELECT * FROM sessions WHERE onetimepass = ?";
  try {
    const [result, fields] = await connection.query(query, [onetimepass]);
    if (result.length > 0) {
      const username = result[0].username;
      console.log(result);
      const accountQuery = "SELECT * FROM accounts WHERE username = ?";
      const [accountResult, fields2] = await connection.query(accountQuery, [
        username,
      ]);
      console.log(accountResult);
      res.json({ amount: accountResult[0].amount });
    }
  } catch (error) {
    console.log(error);
  }
});

//Sätta in pengar
app.post("/me/accounts/transactions", async (req, res) => {
  const { onetimepass, amount } = req.body;

  try {
    // 1. Validate the one-time password and retrieve username
    const sessionQuery = "SELECT * FROM sessions WHERE onetimepass = ?";
    const results = await connection.query(sessionQuery, [onetimepass]);
    
    console.log(results);

    if (results.length > 0) {
      const username = results[0][0].username;
      console.log(username);

      // 2. Update the account balance
      const accountQuery =
        "UPDATE accounts SET amount = amount + ? WHERE username = ?";
      await connection.query(accountQuery, [amount, username]);

      const getAccQuery = "SELECT * FROM accounts WHERE username = ?";
      const newAmount = await connection.query(getAccQuery, [username]);
      res.json({
        message: "Deposit successful",
        newBalance: newAmount[0].amount,
      });
      console.log(newAmount[0]);
    }
  } catch (error) {
    console.log(error);
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});
