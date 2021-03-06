##2장 gulp 관련 오류
1. 책과 다르게 gulp 버전업으로 gulpfile.js 실행시 꼭 리턴해줘야한다
 - gulp.task('message', function(done) {
  console.log("HTTP Server Started");
  done();
});
 - 참고 https://stackoverflow.com/questions/36897877/gulp-error-the-following-tasks-did-not-complete-did-you-forget-to-signal-async
 - 전체적인 소스 참고(npm install 부터 다 변경됨)
   https://chaewonkong.github.io/javascript/2018/12/06/gulp-babel/

##3장 리터럴과 변수, 상수, 데이터 타입
* 리터널
    * 단어의 값을 프로그램 앞에서 직접 지정한다는 의미
    * 값을 만드는 방법

* 리터럴과 식별차의 차이
    * 리터럴: 따옴표표시 가능
    * 식별자: 따옴표표시 불가능
    
* 자바스크립트의 내장된 원시타입
    * Array
    * Date
    * RegExp
    * Map , WeakMap
    * Set , WeakSet 
 
* 자바스크립트는 숫자형 데이터타입은 double 한개이 

* 문자열 리터널
    * 작은따옴표, 큰따옴표, 백틱을 사용가능
    * 문자열안에 \을 사용할 경우 문자열이 여기서 끝나지 않았다고 자바스크립트에게 알려줌
    * 자바스크립트 문자열 안에 HTML을 쓸때는 작은 따옴표를 사용

* 템플릿 문자열
    * ES6에서 도입된 기능으로 문자열 채우기라고도 부름
    * 문자열 템플릿은 백틱을 사용한다
    * ex) const message=`The Current is ${currentTemp}`;
    
* 0은 false이고 나머지값은 모두 true
    * ex)"false"->true

* 심볼
    * 유일한 토큰값을 나타내기 위해 ES6에서 도입한 데이터 타입
    * 항상 유일하며 이런면에서 객체와 유사       

* null과 undefined
    * null과 undefined 모두 존재하지 않는 값을 나타낸다
    * null은 프로그래머에게 허용된 데이터 타입이며 undefined는 자바스크립트 자체에서 사용

* 객체
    * 객체의 콘텐츠는 프로퍼티 or 멤버라고 부름 
    * 프로퍼티의 이름은 반드시 문자열 or 심볼이며 값은 어떤타입이든 상관없음
    ex) obj.color="yellow";
    * . 멤버 접근 연산자(점연산자), []계산된 멤버 접근 연산자(대괄호)
    ex) obj["color"]; //yellow   
    * obj는 항상 같은 객체를 가르키고 있었으며 바뀐것은 객체의 프로퍼티
    
    * 객체에 객체를 담을 수있으며  함수 또한 담을 수 있다
    ~~~
    const sam3={name: 'Sam', classifi: {kingdom:'animal'}}; 
    sam3.speak= function(){return "Meow!"; };
    sam3.speak(); //Meow!"
    ~~~
    * 객체에서 프로퍼티 제거 가능
    ~~~
    delete sam3.name;
    delete sam3.speak;
    ~~~
* 배열
    * 데이터 타입을 가리지 않는다
    ~~~
    const a4=[ 
        {name: "Ruby", hardness:9}  
    ];
    const a5=[1, 'two', 3, null];
    ~~~
        
* 참조형과 원시형
    * 원시 값은 불변이며 원시 값을 전달 할땐느 값 자체를 복사 전달한다.  
    따라서 원본값이 바뀌더라도 사본값은 바뀌지 않는다
    ~~~
    let a=1;
    let b=a;
    a=2;
    console.log(b) //1 사본은 바뀌지 않음
    a===2 // true 값 자체를 복사했음으로 값은 일치
    ~~~
    ~~~
    function change(a){
       a=5;
    };
    
    a=3;
    change(a);
    console.log(a); //3  값 자체를 전달한 것으로 함수 외부에서는 바뀌지 않는다
    ~~~
    
    * 객체는 가변이며 객체를 복사/전달 할 때는 객체가 아니라 그 객체가 가르키고 있는 것을 전달한다.  
    따라서 원본이 바뀌면 사본도 바뀐다
    ~~~
    let o = {a:1};
    let p = o; //이제 p는 o가 가르키고 있는 것을 가리킴
    o.a=2;
    console.log(p) //{a:2}     
    ~~~
    
    * 객체를 가르키는 변수는 그 객체를 가르키고 있을뿐 객체 자체가 아님으로 일치하지 않는다
    ~~~
    let q={a:1};
    q==={a:1};  //false
    ~~~
    
    * 참조를 전달하므로 함수 안에서 객체를 변경하면 함수 외부에서도 변경됨
    ~~~
    function change(o){
        o.a=999;
    }
    let o ={a:1};
    change(o);
    console.log(o); //{a:999}
    
##6.함수    

* 호출과 참조
    * 자바스크립트도 객체로 넘기거나 할당할 수 있다
    * 식별자 뒤에 괄호()는 실행, 괄호가 없으면 참조로 인식.
        ~~~  
      getGreeting(); //Hello World  
      getGreeting    //function getGreeting();
      
      function getGreeting(){  
         return "Hello World";
      }
      
      const o ={};
      o.f = getGreeting;
      console.log(o.f()); //Hello World 출력
      ~~~
      
     * 함수 매개변수는 변수자체가 아니라 그 값만 전달받는다  
       즉 함수 안과 바깥의 변수는 영향이 없다
       
     * 하지만 함수 안에서 객체 자체를 변경하면 함수바깥도 바뀐다
     
     * 자바스크립트는 자바와 다르게 f(x), f(x,y) 는 다 같은 함수를 호출한다
     
     * 매개 변수 해체는 가능하지만 객체이름과 변수이름 같아야한다
     ~~~
     //매개변수이름은 객체와 같아야함
     function getSentence({subject, verb, object}){
         return `${subject} ${verb} ${object}`;
     }
     const o ={         
         subject: "i",  
         verb: "love",
         object: "you"
     };
     
     console.log(getSentence(o));
     ~~~
* this 키워드
    * 일반적으로 this는 호출한 메서드를 소유하게 된다  
    (ex. a.f()) ->여기서 this a이다  
    즉 함수를 어떻게 선언했냐가 아니라 어떻게 호출했냐다
    ~~~
    const o2= {
        name: 'Wallace2',
        speak(){return `My name is ${this.name}`;},
    }
    
    
    console.log(o2.speak());
    
    const speak = o2.speak;
    speak===o2.speak;
    console.log(speak()); //this.name에 undefined 호출됨
    ~~~    
    
    * 메서드 : o2.speak()처럼 객체 인스턴스에서 호출한 의도로 만든 함수
      함수  : this를 사용하지 않으면 어디서 선언했던 관계없이 함수 
    
* 화살표 표기법
    * function 단어와 중괄호 숫자를 줄이려고 고안됨 문법
        * function은 생략가능
        * 함수의 매개변수가 하나라면 괄호 ( () ) 생략가능
        * 함수바디가 표현식 하나라면 중괄호와 return 문 생략 가능
        ~~~
        const f1= function(){return "hello!";}
        const f1= ()=>"hello!";
        const f2= function(name){return 'Hello ${name}!`;}
        const f2= name=>`Hello ${name}!`;
        const f3= function(a,b){return a+b;}
        const f3= (a,b)=>a+b;
        ~~~
    * 화살표 함수는 일반함수와 중요한 차이가 있음
        * this가 다른 변수와 마찬가지로 정적으로 묶인다.
                              
 * call과 apply, bind
    * 함수를 어디서 어떻게 호출했느냐에에 관계없이 this 값을 지정할 수 있다
    * call 함수 첫번째 매개변수는 this, 그 뒤매개변수가 있으면 호출되는 함수로이동
    ~~~
    const bruce={name: "Bruece"};
    const madeline={name: "Madeline"};
    
    function greet(){
        return `Hello I'm ${this.name}`;
    }
    
    function update(birthYear, occupation){
        this.birthYear=birthYear;
        this.occupation=occupation;
    }
    
    update.call(bruce, 1949, 'singer');
    console.log(bruce); // { name: 'Bruece', birthYear: 1949, occupation: 'singer' }
    
    update.call(madeline, 1942, 'actrees')
    console.log(madeline); //{ name: 'Madeline', birthYear: 1942, occupation: 'actrees' }
    ~~~
    
    * apply는 call과 같이 매개변수는 직접 받지만, apply는 매개변수를 배열로 받는다.
    ~~~
    update.apply(bruce, [1955, 'actor']); 
    console.log(bruce);  //{ name: 'Bruece', birthYear: 1955, occupation: 'actor' }
    
    const arr=[2,3,-5,15,7];
    //null을 넘긴 이유는 math함수가 this상관없이 동작
    console.log(Math.min.apply(null, arr));  // Math.min(...arr)-5
    console.log(Math.max.apply(null, arr));  // Math.max(...arr)15    
    
    ~~~
    * bind를 사용하면 함수의 this 값을 영구히 바꿀 수 있음
    ~~~
    const updateBruce= update.bind(bruce);
    updateBruce(1904, "actor");
    console.log(bruce);  //{ name: 'Bruece', birthYear: 1904, occupation: 'actor' }
    updateBruce.call(madeline, 1111, 'template'); //위에서 bind를 bruce로 해서 this 인자로 madeline을 넘겨도 bruce만 변경
    console.log(bruce);  //{ name: 'Bruece', birthYear: 1904, occupation: 'actor' }
    console.log(madeline); //{ name: 'Madeline' }
    ~~~