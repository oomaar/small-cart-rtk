const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the small shopping cart");
});

app.get("/products", (req, res) => {
    res.send(["Welcome to the small shopping cart", "Welcome to the cart route"]);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is up and running on port ${port}`));