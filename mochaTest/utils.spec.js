// spec 이 들어간 코드는 테스트코드이다.
const utils = require('./utils');
const should = require('should')

// mocha
// describe - 테스트 수트 만들기
// it - 테스트 케이스 만들기

describe("utils.js 모듈의 capitalize() 함수는 ", () => { 
  it("문자열의 첫번째 문자를 대문자로 변환한다.", () => {
    const result = utils.capitalize("hello");
    // assert.equal(result, "Hello"); =>    // assert 보다는 should를 더 권장한다.
    result.should.be.equal('Hello');
  });
});
