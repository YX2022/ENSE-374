// Bring in mongoose
const mongoose = require( 'mongoose' );

// connects to the "test" database (ensure mongod is running!)
// the later arguments fix some deprecation warnings
mongoose.connect( 'mongodb://localhost:27017/test', 
                  { useNewUrlParser: true, useUnifiedTopology: true });

// create a schema
//const Cat = mongoose.model( 'Cat', { name: String });

// create a document following that schema
//const kitty = new Cat({ name: 'Zildjian' });
//  kitty.save().then( () => console.log('meow') );
const userSchema = new mongoose.Schema ({
    username: String,
    password: String,
});

const taskSchema = new mongoose.Schema({
    text: String,
    state: String,
    creator: String,
    isTaskClaimed:Boolean,
    claimingUser: String,
    isTaskDone: Boolean,
    isTaskCleared: Boolean
});
// this creates a collection called `games` (Weird, but intuitive)
const User = mongoose.model ( "User", userSchema );
const Task = mongoose.model ( "Task", taskSchema );

app.post("/submit",(req, res )=>{
    console.log("A user is logging in");
    console.log(req.body);

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
user.save();
res.redirect("/todo")
});

app.get("/",async(req,res)=>{
    console.log("A user is logging in ")
})


//game.save();





//  const fs = require( "fs" );

// var myObj = { name : "yxr371" ,
//             password:"123321"};

// fs.writeFile ( __dirname + "/object.json", 
//                    JSON.stringify( myObj ), 
//                    "utf8", 
//                    ( err ) => {
//     if ( err ) {
//         console.log( "Error writingthe file:", err );
//         return;
//     }
// });


const fs = require( "fs" );
// var myObj = { username : "yxr371" ,
//             password:"123321"};
// fs.writeFile ( __dirname + "/object.json", 
//                    JSON.stringify( myObj ), 
//                    "utf8", 
//                    ( err ) => {
//     if ( err ) {
//         console.log( "Error writingthe file:", err );
//         return;
//     }
// });

fs.readFile ( __dirname + "/object.json",
            "utf8", 
            ( err, jsonString ) => {
    if ( err ) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        const object = JSON.parse(jsonString);
        app.post("/", (req, res) => {
            if(req.body["my-name"] == object.username  && req.body["my-pswd"] == object.password ){
                res.sendFile(__dirname + "/public/todo.html")
            }
            else{
                console.log("wrong username or password");
                res.redirect("/");
            }
          });
        
    } catch ( err ) {
        console.log("Error parsing JSON:", err);
    }
});


const express = require ( "express" );
const app = express(); 
app.use(express.urlencoded({ extended: true})); 
app.use(express.static("public"));
app.set("view engine","ejs");
const port = 3000; 

app.listen (port, () => {
    console.log (`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/public/login.html");
});



require("dotenv").config();