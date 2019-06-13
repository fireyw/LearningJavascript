## 이터레이터와 제너레이터 
* 이터레이터(영어로 반복자)
    * 지금 어디있는지를 파악하며 일종의 책갈피와 비슷
    * 읽기시작하려면 next 메서드가 필요하다
    * 반환하는 객체는 value 프로퍼티와 done 프로퍼티가 있다(마지막을 읽으면 done: true) 
    ~~~
    const book = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f"
    ];
    const it=book.values();
    
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    console.log(it.next());
    --결과
    { value: 'a', done: false }
    { value: 'b', done: false }
    { value: 'c', done: false }
    { value: 'd', done: false }
    { value: 'e', done: false }
    { value: 'f', done: false }
    { value: undefined, done: true }
    { value: undefined, done: true }
    ~~~

* 이터레이션 프로토콜
    * 이터레이션 프로토콜은 모든 객체를 이터러블 객체로 바꿀 수 있다
    * 이러레이션 프로토콜은 클래스에 심볼 메서드 Symbol.iterator가 있고 value와 done 프로퍼티가
    있는 객체를 반환하는 next 메서드를 가진 객체를 반환하면 그 클래스의 이터러블 객체이다
 
     ~~~
     class Log{
         constructor(){
             this.messages=[];
         }
         add(message){
             this.messages.push({message, timestamp: Date.now()});
         }
     
         [Symbol.iterator](){
             return this.messages.values();
         }
         
         //아래로 대체가능
         // [Symbol.iterator](){
         //     let i=0;
         //     const messages= this.messages;
         //     return{
         //         next(){
         //             if(i>= messages.length)
         //                 return {value:undefined, done:true};
         //             return {value:messages[i++], done:false};
         //         }
         //     }
         // }         
     }
     
     const log=new Log();
     log.add("a");
     log.add("b");
     log.add("c");
     
     for(let entry of log){
         console.log(`${entry.message}@ ${entry.timestamp}`);
     }
     ~~~
    * 피보나치 수열 예제
    
    ~~~
    class Fibo{
        [Symbol.iterator](){
            let a=0, b=1;
            return{
                next(){
                    let rVal={value:b, done:false};
                    b+=a;
                    a= rVal.value;
                    return rVal;
                }
            }
        }
    }
    const fib= new Fibo();
    let i=0;
    for(let n of fib){
        console.log(n);
        if(++i>9){
            break;
        }
    }
    ~~~     
    
* 제너레이터 
    * 이터레이터를 사용해 자신의 실행을 제어하는 함수
    * 특징
        * 일반적인 함수와 다르게 호출 후 제어가 가능하다
        * 실행중인 함수와 통신한다.
        * 만들때  ' *  '를 붙인다
        * return 외에 yield 키워드를 쓸 수 있다
        ~~~
        function*rainbow(){
            yield 'red';
            yield 'orange';
            yield 'yellow';
            yield 'green';
        }
        
        const it =rainbow();
        for(let color of it){
            console.log(color);
        }
        ~~~
    
    * yield 표현식과 양방향 통신
        * 통신은 yield 표현식을 통해 이루어진다.
        * 표현식은 반드시 어떤 값으로 평가된다.
        * yield표현식의 값은 제너레이터의 이터레이터에서 next를 호출할때 제공되는 매개변수
        ~~~
        function*inter(){                                     //let it = inter();
            const name= yield "What is your name?";           //it.next();
            const color= yield "What is your favorite color?" //it.next('YW');
            return `${name}'s favoirte ${color}`;             //it.next('ORANGE');
        }
        const it =inter();
        console.log(it.next());
        console.log(it.next('YW'));
        console.log(it.next('blie'));
        ~~~
        
    * yield문은 제너레이터의 마지막 문이라도 제너레이터를 끝내지 않는다
    * return 문을 사용하면 위치에 관계없이 DONE은 TRUE가 되고 VALUE는 RETURN이 반환하는 값
     ~~~
     function*abc(){
         yield 'a';
         yield 'b';
         return 'c';
     }
     
     const it=abc();
     console.log(it.next());  //{ value: 'a', done: false }
     console.log(it.next());  //{ value: 'b', done: false }
     console.log(it.next());  //{ value: 'c', done: true }
     
     for(let l of abc()){
         console.log(l);  //a , b 
     }
     ~~~
     * for문을 사용하면 return value 값은 출력되지 않는다. 즉 중요한값을 return 하면 안된다
     * 즉 제너레이터의 return을 쓸때 반환값을 안쓰는 습관을 가져야 한다