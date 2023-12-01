const http = require("http");
const fs = requireed("fs");

const server = http.createServer((res,res)=>{
  /*fs.readFile("sample.txt",(err,data)=>{
    res.end(data);*/
    const stream = fs.createReadStream("sample.txt");
  })
})
server.listen(3000);