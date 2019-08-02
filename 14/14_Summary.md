## 14 비동기적 프로그래밍
* 개요
    * 자바스크립트 애플리케이션은 단일쓰레드
    * 비동기에는 콜백, promise, 제너레이터가 있다
    * 비동기 사용은 크게 3가지다
        1. Ajax 호출을 비롯한 네트워크 요청
        2. 파일을 읽고 쓰는 파일 시스템 작업
        3. 의도적으로 시간 지연 
        
* 콜백
    * 간단히 나중에 호출할 함수
    * 비동기 실행의 가장 큰 목적은 어떤 것도 차단하지 않는 것
* setInterval 과 clearInterval
    * setTimeout 은 한번만 실행하지만 setInterval은 clearInterval 까지 멈추지 않는다
    * setInterval이 ID를 반환하여 이것을 사용하여 clearInterval 할 수 있다. 
    ~~~
    const start = new Date();
    let i=0;
    const intervalid= setInterval(function(){
        let now = new Date();
        if(now.getMinutes()!=start.getMinutes() || ++i>10){
            return clearInterval(intervalid);
        }
        console.log(`${i}: ${now}`);
    }, 5*1000)
    ~~~        
    
* 스코프와 비동기적 실행
    * 콜백은 자신을 선언한 스코프에 있는것에 접근 할 수 있다
    * 따라서 i 의 값은 콜백이 실행될대마다 다르다
    ~~~
    function countdown(){
        let i;  //for 문 밖에서 선언해서 문제가 됨
        for(i=5;i>=0;i--){
            setTimeout(function(){
                console.log(i===0?"GO!":i)
            }, (5-i)*1000)
        }
    }
    ~~~    
* 오류 우선 콜백    
    * 콜백을 사용하면 예외처리가 어려워짐으로 표준이 필요
    * 콜백의 첫번째 매개변수에 에러객체를 쓰자
    ~~~
    const fs= require('fs');
    
    const frame='may or may not';
    fs.readFile(fname, function(err,data){
        if(err) return console.error(`error reading file ${fname} : ${err.message}`);
        console.log(`${fname} content: ${data}`);
    })
    ~~~             
* 콜백 헬
    * try catch 블록은 같은 함수안에서만 동작한다 함수 내에 다른곳에서 에러가 나면 헬에 빠짐
    
* 프라미스 
    * 콜백의 단점을 해결하려는 시도속에서 만들어짐
    * 프라미스에서도 콜백을 사용하지만 예측가능한 패턴을 사용할 수 있게 함
    * 기본개념
        * 프라미스 기반 비동기 함수를 호출하면 그 함수는 promise 인스턴스를 반환한다
        * 반환한 프라미스는 실패 or 성공             