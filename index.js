const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => { 
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {  // 서버를 종료하지않고 요청대기상태로 만드는 함수
  console.log(`Server running at http://${hostname}:${port}/`);
});


// yj@YJui-MacBookPro nodeJS_apiTest % node index.js => Server running at http://127.0.0.1:3000/
// yj@YJui-MacBookPro nodeJS_apiTest % curl -X GET 'localhost:3000' => Hello World
