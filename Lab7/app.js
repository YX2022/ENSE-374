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
                res.sendFile(__dirname + "/todo.html")
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
    res.sendFile(__dirname + "/login.html");
});
