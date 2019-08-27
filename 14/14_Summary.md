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
    
    간단한 익명함수
    ~~~
    
    setTimeout(function(){
        console.log("Afte timeout: " + new Date())
    }, 60*100);
    ~~~
    
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
    * 함수를 호출하면 항상 클로저가 생성되고 매개변수를 포함해 함수 안에서 만든 변수는
    모두 무언가가 자신에 접근할 수 있는 한 계속 존재함.
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
    ~~~

    function countdown(seconds){
        return new Promise(function(resolve, reject){
            for(let i=seconds;i>=0;i--){
                setTimeout(function(){
                    if(i===3) return reject(new Error("oh my God")); //3일때 에러만 발생하고 2와 1로 실행한다
                    if(i>0) console.log((i + '...'));
                    else resolve(console.log("GO!"));
                }, (seconds-i)*1000);
            }
        });
    }    
    const p=countdown(5);
    
    p.then(
        function(){
            console.log(("countdown completed successfully"));
        },
        function(err){
            ("countdown experienced as error: " + err.message);
        }
    );  

    ~~~        
    * reject를 사용해 에러는 발생 시킬 수 있지만 함수를 멈추지는 않는다.
    * 프라미스 비동기는 작업이 성공 실패를 알려주지만 현재진행상황을 알려주지 않는다.
    
    * node에 내장된 EventEmitter 사용
    
    ~~~
    const EventEmitter = require('events').EventEmitter;
    
    class Countdown extends EventEmitter{
        constructor(seconds, superstitious) {
            super();
            this.seconds=seconds;
            this.superstitious=superstitious;
        }
        go(){
            const countdown= this;
            const timeoutIds=[];
            return new Promise(function(resolve, reject){
                for(let i=countdown.seconds;i>=0; i--){
                    timeoutIds.push(setTimeout(function(){
                        if(countdown.seconds && i ===3){
    
                            //대기중인 타임아웃을 모두 취소
                            timeoutIds.forEach(clearTimeout);
                            return reject(new Error("oh my god"));
                        }
                        //tick 이벤트 생성
                        countdown.emit('tick', i);
                        if(i===0) resolve();
    
                    }, (countdown.seconds-i)*1000));
                }
            });
        }
    }
    
    function launch(){
        return new Promise(function(resolve, reject){
            console.log(("Lift off"));
            setTimeout(function(){
                resolve("In orbit!");
            }, 2*1000);
        });
    }
    
    
    const c =new Countdown(5)
        .on('tick', i => console.log(i + '...'));  // tick 이벤트와 익명 함수 연동
    
    c.go()
        .then(launch)   //프라미스 체인: 프라미스가 완료되면 다른 프라미스를 반환하는 함수 즉시 호출 
        .then(function(msg){  
            console.log((msg));
        })
        .catch(function(err){
            console.log(("Houston, we have a problem..."));
        })
    
    ~~~    
    
    * 결정되지 않는 프라미스 방지
        * 프라미스는 비동기적 코드를 단순화하고 콜백이 두번 이상 실행되는 문제를 방지
        * 하지만 resolve, reject를 호출하는건 잊는거까지 해결하지 못한다
        * 결정되지 않은 프라미스를 방지하는 한 가지 방법은 프라미스에 타임아웃을 건다
        
* 제너레이터
    * 함수와 호출자 사이의 양방향 통신을 함
    ~~~
    function nfcall(f, ...args){
        return new Promise(function(resolve, reject){
           f.call(null, ...args, function(err, ...args){
               if(err) return reject(err);
               resolve(args.length<2? args[0]: args);
           }) ;
        });
    }
    
    function ptimeout(delay){
        return new Promise(function(resolve, reject){
           setTimeout(resolve, delay);
        });
    }
    
    function grun(g){
        const it = g();
        (function iterate(val){
            const x= it.next(val);  //yield 값을 넘긴 제너레이터는 next를 호출할때까지 기다림
            if(!x.done){
                if(x.value instanceof Promise){
                    x.value.then(iterate).catch(err=> it.throw(err));
                }else{
                    setTimeout(iterate, 0, x.value);
                }
            }
        })();
    }
    
    function* theFutureIsNow(){
        const dataA = yield nfcall(fs.readFile, "a.txt");
        const dataB = yield nfcall(fs.readFile, "b.txt");
        const dataC = yield nfcall(fs.readFile, "c.txt");
        yield ptimeout(60*1000);
        yield nfcall(fs.writeFile, 'd.txt', dataA+dataB+dataC);
    }    
    
    grun(theFutureIsNow);
    ~~~
    
    * Promise의 all 메서드 : 배열로 받은 프라미스가 모두 완료될때 완료
    ~~~
        
    //promse all 사용
    function* theFutureIsNow2(){
        const data= yield Promise.all([
        nfcall(fs.readFile, "a.txt");
        yield nfcall(fs.readFile, "b.txt");
        yield nfcall(fs.readFile, "c.txt");
        ]);
        yield ptimeout(60*1000);
        yield nfcall(fs.writeFile, 'd.txt', dataA+dataB+dataC);
    }    
    ~~~
    
    * yield 키워드
        * 제너레이터 함수를 중지하거나 재개하는데 사용