import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000; // Set your desired port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
    // Generera en sexsiffrig numerisk OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

// Din kod här. Skriv dina arrayer
const users = []
const accounts = []
const sessions = []

// Din kod här. Skriv dina routes:

//Skapa konto
app.post("/users", (req, res) => {
    const { username, password } = req.body;
    const id = generateOTP();
    const amount = 0;
    const newUser = { id, username, password };
    const newAcc = { id, username, amount}
    users.push(newUser);
    accounts.push(newAcc);
  
    console.log("Users" + JSON.stringify(users));
    console.log("Accounts:" + JSON.stringify(accounts));
  
    res.send("Post data received: " + JSON.stringify(req.body));
  });

//Logga in
  app.post("/sessions", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    
    const onetimepass = generateOTP();
    const newSession = { username, onetimepass };
    if (!user) {
        res.status(401).send("Try again loser, wrong user");
        return;
    }
    if (user.password === password) {
        const account = accounts.find((a) => a.username === username)

        console.log("User account:" + JSON.stringify(user))
        console.log("Account amount:"+ account.amount)
        
        sessions.push(newSession);
        res.json({onetimepass})
    } else {
        res.status(401).send("Try again loser, wrong pass");

    }

  });

// Show saldo
  app.post("/me/accounts", (req, res) => {
    const { onetimepass } = req.body;
    

    const otp = sessions.find((a) => a.onetimepass === onetimepass);
    const account = accounts.find((a) => a.username === otp.username)

    if (account) {
      
      res.send(JSON.stringify({amount: account.amount}));
    console.log("Account amount:" + JSON.stringify(account.amount))
    } else {
      res.status(404).json({error: "User not found" });
      console.log("User not found for username: " + username)
    }
  });


//Sätta in pengar
  app.post("/me/accounts/transactions", (req, res) => {
    const { onetimepass, amount } = req.body;
    const otp = sessions.find((a) => a.onetimepass === onetimepass);
    if (!otp) {
      res.status(404).json({ error: "Invalid OTP" });
      return;
    }

    const account = accounts.find((a) => a.username === otp.username)
 if (amount <= 0) {
        res.status(400).json({ error: "Invalid amount" });
        return;
    }

    account.amount += amount;
    res.json({ message: "Deposit successful", newBalance: account.amount });
    console.log("New account balance:" + JSON.stringify(account.amount));

  })

// Starta servern
app.listen(port, () => {
    console.log(`Bankens backend körs på http://localhost:${port}`);
});
