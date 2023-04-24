// 어플리케이션
// 익스프레스 인스턴스를 어플리케이션이라 한다
// 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다
// 라우팅 설정을 할 수 있다
// 서버를 요청 대기 상태로 만들수 있다

const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

// 에러 미들웨어
function commonmw(req, res, next) {
  console.log('commonmw');
  next(new Error('error ouccered'));
}

function errormw(err, req, res, next) {
  // 에러를 처리하거나 처리하지 못했으면 next(err)로 넘겨준다.
  console.log(err.message)
  next();
}

function logger(req,res,next) {
  console.log('I am logger')
  // 할일이 끝난 후 반드시 next 함수를 실행해줘야한다.
  next();
}

function logger2(req,res,next) {
  console.log('I am logger2')
  next();
}

app.use(commonmw);
app.use(errormw);
// 미들웨어 (use를 사용하여 호출) - 함수들의 연속이다.
app.use(logger);
app.use(logger2);

// 써드파티 미들웨어(다른사람이 만든 미들웨어) 설치 (ex. npm i morgan)후 옵션값을 넣어서 use로 호출 
app.use(morgan('dev'));

// 라우팅
app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});

// 라우팅 
// 요청 url에 대해 적절한 핸들러 함수로 연결해 주는 기능을 라우팅이라 한다.
// 어플리케이션의 get(), post() 메소드로 구현할 수 있다.
// 라우팅을 위한 전용 Router 클래스를 사용할 수도 있다.

// 요청객체 - 클라이언트의 요청 정보를 담은 객체. 
// http 모듈의 request 객체를 래핑한 것. req.params(), req.query(), req.body() 메소드를 주로 사용한다.

// 응답객체 - 클라이언트의 응답 정보를 담은 객체.
// http 모듈의 response 객체를 래핑한 것. res.send(), res.status(), res.json() 메소드를 주로 사용한다. 

