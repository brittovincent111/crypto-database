require("dotenv").config();
const express = require("express");
const { connectMonogdb } = require("./config/dbConfig");
const {
    buyOrderRequest,
    sellOrderRequest,
} = require("./controllers/bitcoinController");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());
async function startServer() {
    await connectMonogdb();
    app.post("/buy", buyOrderRequest);
    app.post("/sell", sellOrderRequest);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch((err) => {
    console.error("Error starting the server:", err);
});
