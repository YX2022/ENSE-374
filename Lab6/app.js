// const fs = require( "fs" );

// var myObj = { name : "Adam" ,
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
fs.readFile ( __dirname + "/object.json",
            "utf8", 
            ( err, jsonString ) => {
    if ( err ) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        const object = JSON.parse(jsonString);
        console.log(object); // Adam
    } catch ( err ) {
        console.log("Error parsing JSON:", err);
    }
});

//39:00
