const Course = require('./Models/courses').Course;
const http = require('http');
// const add = require('./locations').add;
http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end("Hello World!");
}).listen(3000, ()=>{
    console.log("Server started");
    const objCourse = new Course();
    objCourse.create({name: "Computer Science"});
    objCourse.read();
    // objCourse.find({name: "Computer Science"});
    objCourse.find({_id: '6614179e072398969b5eb672'});
    objCourse.update('6614179e072398969b5eb672', {name: 'Actuarial Science'});
    objCourse.delete('6614178879705bbb4e877a6d');
    // console.log(objCourse.find({name: "Computer Science"}));
});