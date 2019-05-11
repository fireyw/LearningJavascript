'use strict'; //es6 기능: 블록 스코프 변수 선언

var sentences = [{
  subject: 'javascript',
  verb: 'is',
  object: 'great'
}, {
  subject: 'Elephants',
  verb: 'are',
  object: 'large'
}]; //es6 기능: 객체 분해

function say(_ref) {
  var subject = _ref.subject,
      verb = _ref.verb,
      object = _ref.object;
  //es6 기능: 템플릿 문자열
  //아래 사용한 것은 따옴표가 아니라 백틱`
  //키보드의 탭 키 바로 위 문자열
  console.log("".concat(subject, " ").concat(verb, " ").concat(object));
} //es6 기능 : for ..of


for (var _i = 0, _sentences = sentences; _i < _sentences.length; _i++) {
  var s = _sentences[_i];
  say(s);
}