const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 

app.set("view engine", "ejs");
// host static resources
app.use(express.static("public"));
// body-parser is now built into express!
app.use(express.urlencoded({ extended: true})); 

// a common localhost test port
const port = 3000; 

// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
})

//app.post("/", (req, res) => {
    // template literal
    //res.render("greeting",{username: req.body["my-name"]});
    //res.send (`<h1>Welcome to my page, ${req.body["my-name"]}</h1>`)
//})

let fruits = ["apples", "orange", "peach", "mango"];
let games = ["Arknights", "blue archive", "genshin impact"]
app.post("/", (req, res) => {
    res.render("greeting", {username: req.body["my-name"],  //greeting = name of the page
                            fruitList: fruits,
                        gameList: games});
});


app.get("/greeting", function (req, res) {
    res.render("greeting",{username:"mkx"});
});
