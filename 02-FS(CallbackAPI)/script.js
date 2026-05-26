const fs = require('fs');


// // writeFile -> (file, data[, options], callback)
// fs.writeFile("hello.txt", "Writing the file", function(err){
//     if(err) console.error(err);
//     else console.log("Writing done !!");
// })


// // appendFile
// fs.appendFile("hello.txt", ", Appending the file", function(err){
//     if(err) console.error(err);
//     else console.log("Append done !!");
// })


// // rename
// fs.rename("hello.txt", "hello2.txt", function(err){
//     if(err) console.error(err);
//     else console.log("Rename done !!");
// })


// // copyFile
// fs.copyFile("hello2.txt", "./copy/copy1.txt", function(err){
//     if(err) console.error(err);
//     else console.log("Copy done !!");
// })


// // unlink -> delete
// fs.unlink("hello2.txt", function(err){
//     if(err) console.error(err);
//     else console.log("Delete done !!");
// })



fs.mkdir("./copy", {recursive : true}, function(err){
    if(err) console.error(err);
    else console.log("removed");
})