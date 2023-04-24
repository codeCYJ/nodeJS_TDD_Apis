// test code

// superTest
// 단위테스트 : 함수의 기능 테스트
// 통합테스트 : API의 기능 테스트
// 슈퍼테스트 : 익스프레스 통합 테스트용 라이브러리
// 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.
// https://github.com/visionmedia/supertest

const app = require('../../');
const request = require('supertest');
const should = require("should");
const models = require('../../models');

describe('Get /users는', () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users)); // 여러개의 데이터를 집어넣어줌;
  describe('성공시', () => {

    it("user 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it("최대 limit 갯수만큼 응답한다.", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });
  describe("실패시", () => {
    it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
      request(app)
        .get('/users?limit=two')
        .expect(400)  //it 을 사용안하고 바로 expect로 사용해도 가능한다 (supertest에서 지원)
        .end(done);
    });
  });
});

describe('Get /users/:id 는', () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users)); // 여러개의 데이터를 집어넣어줌;

  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다.", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닌경우 400으로 응답한다.", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });
    it("id로 유저를 찾을 수 없을경우 404로 응답한다.", (done) => {
      request(app).get("/users/999").expect(404).end(done);
    });
  });
});

describe("Delete /users/id 는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users)); // 여러개의 데이터를 집어넣어줌;

  describe("성공시", () => {
    it("204를 응답한다", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아닐 경우 400으로 응답한다.", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

describe("Post /users 는", () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users)); // 여러개의 데이터를 집어넣어줌;

  describe("성공시", () => {
    let name = "daniel",
      body;

    //before (mocha지원)을 이용하여 중복되는 done을 미리 저장할 수 있다.
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("생성된 유저 객체를 반환한다.", () => {
      body.should.have.property("id");
    });

    it("입력한 name을 반환한다.", () => {
      body.should.have.property("name", name);
    });
  });
  describe("실패시", () => {
    it("name 파라미터 누락시 400을 반환한다.", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("name 중복 일 경우 409을 반환한다.", (done) => {
      request(app)
        .post("/users")
        .send({ name: "daniel" })
        .expect(409)
        .end(done);
    });
  });
});

describe('Put /users/:id 는', () => {
  const users = [{ name: "alice" }, { name: "bek" }, { name: "chris" }];
  before(() => models.sequelize.sync({ force: true }));
  before(() => models.User.bulkCreate(users)); // 여러개의 데이터를 집어넣어줌;

  describe("성공시", () => {
    it("변경된 name을 응답한다.", (done) => {
      const name = "chally";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("정수가 아닌 id인 경우 400을 응답한다.", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });
    it("name이 없을경우 400을 응답한다.", (done) => {
      request(app).put("/users/1").send({}).expect(400).end(done);
    });
    it("없는 유저일 경우 404를 응답한다.", (done) => {
      request(app)
        .put("/users/999")
        .send({ name: "foo" })
        .expect(404)
        .end(done);
    });
    it("이름이 중복일 경우 409를 응답한다.", (done) => {
      request(app).put("/users/3").send({ name: "bek" }).expect(409).end(done);
    });
  });
});
// node_modules/.bin/mocha superTest/apis.spec.js 로 테스트하는걸 package.json에 test로 등록해놔서 npm test로 실행가능 => npm t 로 실행가능.
// node_modules/.bin/mocha superTest/apis.spec.js 대신 mocha superTest/apis.spec.js 로 가능. 