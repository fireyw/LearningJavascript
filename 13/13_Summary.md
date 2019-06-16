## 13 함수와 추상적 사고
* 서브루틴의로서의 함수
    * 서브루틴은 반복되는 작업의 일부를 떼어내서 이름을 붙이고, 언제든 그 이름만 부르면 실행    
    * 함수의 이름을 정하는데 주의 깊게 하자
    
* 함수로서의 함수
    * 순수함수는 입력이 들어가면 결과가 나오는 관계
    * 순수함수는 입력이 같으면 결과가 같다
    * 외부 변수를 클로저로 감싼다
        * 클로저: 독립적인 변수를 가리키는 함수고 클로저 안에 정의된 함수는 만들어진 환경을 기억  
        (참고: ) https://hyunseob.github.io/2016/08/30/javascript-closure/        
    ~~~
    클로저 예제
    var base ='Hello, ';
    function sayHelloTo(name){
        var text = base + name;
        return function(){
            console.log(text)
        }
    }
    
    var hello1= sayHelloTo('승민');
    var hello2= sayHelloTo('현섭');
    
    hello1();  //Hello, 승민
    hello2();  //Hello, 현섭    
   ----------
    
    const getNext=(function(){
        const colors=['red','orange','yellow','green'];
        let colorIndex=-1;
        return function(){
            if(++colorIndex>colors.length) colorIndex=0;
            console.log(colors[colorIndex]);
            return colors[colorIndex];
        }
    })
    ~~~
* 함수도 객체다
    * 스크립트 함수는 Function 객체의 인스턴스
    * typeof v : v가 함수일때 function 을 반환  
* IIFE와 비동기적 코드
    * IIFE(즉시 호출 함수)
    * 익명함수를 만들어 즉시 호출하는 IIFE 실행            
    ~~~
    ex1)
    var i;
    for(i=5;i>=0;i--){
        setTimeout(function(){
            console.log(i===0?"go!":i);  //-1만 출력
        }, (5-i)*1000)
    }
    
    개선
    var i;
    for(i=5;i>=0;i--){
        (function(i){setTimeout(function(){
            console.log(i===0?"go!":i);
        }, (5-i)*1000)})(i);
    }
    ~~~              
    
* 변수로서의 함수
    1. 함수를 가르키는 변수를 만들어 별명을 정할 수 있다  
       * 별명을 지을때는 괄호를 붙이지 않는다(). 괄호를 붙이면 함수가 호출됨    
    ~~~
    const Money = require('math-money');
    
    const oneDollar = Money.Dollar(1);
    const Dollar=Money.Dollar; //Money.Dollar아래와 같이 별명을 붙임
    const twoDollar= Dollar(2);   //oneDollar와 같은 type의 인스턴스
    ~~~
    2. 배열 안의 함수
        * 함수를 배열안에 저장 할 수 있다 
    ~~~
    const sin=Math.sin;
    const cos=Math.cos;
    const theta=Math.PI/4;
    const zoom=2;
    const offset=[1,-3];
    
    const pipeline=[
        function rotate(p){
            return {
                x:p.x * cos(theta)- p.y*sin(theta),
                y:p.y * sin(theta)- p.y*cos(theta)
            }
        },
        function scale(p){
            return {x:p.x*zoom, y:p.y*zoom};
        },
        function translate(p){
            return {x:p.x+offset[0], y:p.y+offset[1]};
        }
    ]
    
    
    const p = {x:1, y:1}
    let p2 =p;
    for(let i = 0; i<pipeline.length; i++){
        p2=pipeline[i](p2);
    }
    
    console.log(p2);
    ~~~
    3. 함수에 함수 전달
        * 대표적인 사례가 콜백(CB)
        * 함수는 동작이고 함수를 받은 함수가 그동작을 활용
    ~~~
    function sum(arr, f){
        if(typeof f!= 'function') f=x=>x;
    
        return arr.reduce((a,x)=>a+f(x),0)
    }
    
    console.log(sum([1, 2, 3])); //6
    console.log(sum([1, 2, 3],x=>x*x)); //14
    console.log(sum([1, 2, 3], x => Math.pow(x, 3))); //36
    ~~~
    
    4. 함수를 반환하는 함수
    ~~~
    function sum(arr, f){
        if(typeof f!= 'function') f=x=>x;
    
        return arr.reduce((a,x)=>a+f(x),0)
    }
    
    function newSummer(f){
        return arr=>sum(arr, f);
    }
    
    const sumOfSquares= newSummer((x=>x*x));
    const sumOfCubes = newSummer(x=>Math.pow(x,3));
    
    console.log(sumOfSquares([1, 2, 3])); //14
    console.log(sumOfCubes([1, 2, 3]));;  //36
    ~~~
    
* 재귀    
    * 자기 자신을 호출 하는 함수
    ~~~
    function findNeedle(haystack){
        if(haystack.length===0){
            console.log("no haystack here!");
            return "no haystack here!";
        }
        if(haystack.shift()==='needle'){  //배열의 첫번째 요소를 리턴하고 제거
            console.log("find needle");
            return "find needle";
        }
        return findNeedle(haystack);
    }
    ~~~
    