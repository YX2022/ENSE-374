
process.env.DB_HOST

const express = require ( "express" );
const mongoose = require( 'mongoose' );
const app = express(); 

const port = 3000; 

app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

////1. Require dependencies//////////////////////////////////////////////////////////////////////
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
require("dotenv").config();


//// 2. Create a session. The secret is used to sign the session ID.////////////////////////////////////
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use (passport.initialize());
app.use (passport.session());

app.set("view engine","ejs");

mongoose.connect( 'mongodb://localhost:27017/test', 
                  { useNewUrlParser: true, useUnifiedTopology: true });


// 3. Create the userSchema /////////////////////////////////////////
// It is important not to change these names
// passport-local-mongoose expects these. Use `username` and `password`!
const taskSchema = new mongoose.Schema({
    _id : Number,
    text: String,
    state: String,
    creator: String,
    isTaskClaimed: Boolean,
    claimingUser: String,
    isTaskDone: Boolean,
    isTaskCleared: Boolean
});

const Task = mongoose.model ( "Task", taskSchema );



const userSchema = new mongoose.Schema ({
    username: String,
    password: String
})
// plugins extend Schema functionality
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
////////////////////////////////////////////////////////////////////

// 4. Add our strategy for using Passport, using the local user from MongoDB
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen (port, () => {
    console.log (`Server is running on http://localhost:${port}`);
});
// 5. Register a user with the following code, which needs to be in the appropriate route
// As in (3), be sure to use req.body.username and req.body.password, and ensure the 
// html forms match these values as well
app.post( "/register", (req, res) => {
    console.log( "User " + req.body.username + " is attempting to register" );
    User.register({ username : req.body.username }, 
                    req.body.password, 
                    ( err, user ) => {
        if ( err ) {
        console.log( err );
            res.redirect( "/" );
        } else {
            passport.authenticate( "local" )( req, res, () => {
                res.redirect( "/todo" );
            });
        }
    });
});
////////////////////////////////////////////////////////////////////

// 6. Log in users on the login route ////////////////////////////////
app.post( "/login", ( req, res ) => {
    console.log( "User " + req.body.username + " is attempting to log in" );
    const user = new User ({
        username: req.body.username,
        password: req.body.password
    });
    req.login ( user, ( err ) => {
        if ( err ) {
            console.log( err );
            res.redirect( "/" );
        } else {
            passport.authenticate( "local" )( req, res, () => {
                res.redirect( "/todo" ); 
            });
        }
    });
});

app.get("/", (req, res) =>{
    console.log("A user is accessing the root route using get");
    res.sendFile(__dirname + "/index.html");
});
////////////////////////////////////////////////////////////////////

// 7. Register get routes for reviews and add-review ////////////////
app.get( "/todo", async( req, res ) => {
    console.log("A user is accessing the todo route using get, and...");
    if ( req.isAuthenticated() ){
        try {
            console.log( "was authorized and found:" );
            res.render( "todo");
        } catch ( error ) {
            console.log( error );
        }
    } else {
        console.log( "was not authorized." );
        res.redirect( "/" );
    }
});

////////////////////////////////////////////////////////////////////

// 8. Logout ///////////////////////////////////////////////////////
app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
          return next(err); 
      }
      res.redirect('/');
    });
  });
  ////////////////////////////////////////////////////////////////////





app.post( "/addtask", function( req, res ) {
    const task = new Task ({
        _id : req.body._id,
        text: req.body.text,
        state: req.body.state,
        creator: req.body.creator,
        isTaskClaimed: req.body.isTaskClaimed,
        claimingUser: req.body.claimingUser,
        isTaskDone: req.body.isTaskDone,
        isTaskCleared: req.body.isTaskCleared
    });
    
});
////////////////////////////////////////////////////////////////////






// Bring in mongoose

// connects to the "test" database (ensure mongod is running!)
// the later arguments fix some deprecation warnings

// create a schema
//const Cat = mongoose.model( 'Cat', { name: String });

// create a document following that schema
//const kitty = new Cat({ name: 'Zildjian' });
//  kitty.save().then( () => console.log('meow') );
//const userSchema = new mongoose.Schema ({
 //   username: String,
 //   password: String,
//});

//const User = mongoose.model ( "User", userSchema );

//const user = new User({
//     username: "yxr371",
//     password: "123321"
// });

// this creates a collection called `games` (Weird, but intuitive)

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


//const fs = require( "fs" );
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

// fs.readFile ( __dirname + "/object.json",
//             "utf8", 
//             ( err, jsonString ) => {
//     if ( err ) {
//         console.log("Error reading file from disk:", err);
//         return;
//     }
//     try {
//         const object = JSON.parse(jsonString);
//         app.post("/", (req, res) => {
//             if(req.body["my-name"] == object.username  && req.body["my-pswd"] == object.password ){
//                 res.sendFile(__dirname + "/public/todo.html")
//             }
//             else{
//                 console.log("wrong username or password");
//                 res.redirect("/");
//             }
//           });
        
//     } catch ( err ) {
//         console.log("Error parsing JSON:", err);
//     }
// });
















