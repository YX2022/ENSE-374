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
//const userSchema = new mongoose.Schema ({
 //   username: String,
 //   password: String,
//});

//const User = mongoose.model ( "User", userSchema );

//const user = new User({
//     username: "yxr371",
//     password: "123321"
// });
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
// this creates a collection called `games` (Weird, but intuitive)

const Task = mongoose.model ( "Task", taskSchema );

app.post("/submit",(req, res )=>{
    console.log("A user is logging in");
    console.log(req.body);

res.redirect("/todo")
});

app.get("/",async(req,res)=>{
    console.log("A user is logging in ")
})


//game.save();

/*                                                                         */



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




DB_HOST=localhost
DB_USER=root

process.env.DB_HOST

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

// 3. Create the userSchema /////////////////////////////////////////
// It is important not to change these names
// passport-local-mongoose expects these. Use `username` and `password`!
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
                res.redirect( "/reviews" );
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
                res.redirect( "/reviews" ); 
            });
        }
    });
});
////////////////////////////////////////////////////////////////////

// 7. Register get routes for reviews and add-review ////////////////
app.get( "/reviews", async( req, res ) => {
    console.log("A user is accessing the reviews route using get, and...");
    if ( req.isAuthenticated() ){
        try {
            console.log( "was authorized and found:" );
            const results = await Game.find();
            console.log( results );
            res.render( "reviews", { results : results });
        } catch ( error ) {
            console.log( error );
        }
    } else {
        console.log( "was not authorized." );
        res.redirect( "/" );
    }
});

// 7. Register get routes for reviews and add-review ////////////////
app.get( "/add-review", ( req, res ) => {
    console.log( "A user is accessing the add-review page, and..." );
    if (req.isAuthenticated()) {
        console.log( "was authorized" );
        res.render( "add-review" );
    } else {
        console.log( "was not authorized" );
        res.redirect( "/" ) 
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

  // 9. Submit a post to the database ////////////////////////////////
// Note that in the username, we are using the username from the
// session rather than the form
app.post( "/submit", async( req, res ) => {
    console.log( "User " + req.user.username + " is adding the review:" );
    console.log( req.body )
    const game = new Game({
        userName:   req.user.username,
        gameName:   req.body.gameName,
        score:      parseInt( req.body.score ),
        reviewText: req.body.reviewText
    });

    game.save();

    res.redirect( "/reviews" );
});
////////////////////////////////////////////////////////////////////
















