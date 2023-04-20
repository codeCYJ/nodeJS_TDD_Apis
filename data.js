//동기
const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf-8');

console.log(data);

// 비동기
const data2 = fs.readFile('./data.txt', 'utf-8', function (err, data) {
  console.log(data); // 콜백함수
});
