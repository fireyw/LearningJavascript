##스코프
* 정적 스코프
    * 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할때 알 수 있다  
      호출할 때 알 수 있는것이 아니다
      ~~~
      const x=3;
      
      function f(){
          console.log(x);
          console.log(y);
      }
      { //새 스코프
          const y=5;
          f();  // error 발생
      }
      ~~~
* 전역 스코프
    * 어디서나 호출 할 수 있는 것을 말하지만 의존성 없게 사용해야한다
    ~~~
    let name="Irena";
    let age=25;
    //이렇게 사용하기 보다
    let user={
        name="Irena",
        age=25
    }   
    ~~~
* 블록 스코프
    * 블록은 중괄호를 묶은 것으로 블록의 스코프에서만 보이는 식별자를 의미 
    
* 변수 숨기기
    * 내부 블록 x 는 외부블록에서 정의한 x와 이름만 같음으로 외부스코프 x를 숨긴다
    ~~~
    {
        //외부 블록
        let x='blue';
        console.log(x); //blue
    
        {
            //내부 블록
            let x=3;
            console.log(x);  //3
        }
        console.log(x); //blue
    
    }
    console.log(typeof x); //undefined
    ~~~
    
    * 스코프의 계층적인 성격때문에 어떤 변수가 스코프에 있는 확인하는 스코프 체인이 생김
* 클로저
    * 함수가 특정 스코프에 접근할 수록 의도적으로 스코프를 정의하는것
    * 스코프를 함수 주변으로 좁히는 것
    * 스코프 안에 함수를 정의하면 해당 스코프는 더 오래 유지된다
    ~~~
    let globalFunc; //정의되지 않은 전역함수
    {
        let blockVar ='a';
        globalFunc= function(){
            console.log(blockVar);
        }
    }
    globalFunc();  //a
    ~~~              
    * 일반적으로 자신의 스코프에 없는것엔 접근할 수 없으나 함수를 정의해 클로저를 만들면  
      접근할 수 있다
    ~~~
    let f;
    {
        let o={note:'Safe'};
        f=function(){
            return o;
        }
    }
    let oRef = f();
    oRef.note ="Not so safe after all";
    console.log(f());  //"Not so safe after all"
    ~~~
    
* 즉시 호출하는 함수 표현식
    * 익명할수를 만들고 즉시 호출
    * 스코프 안에서 안전하게 보호되며 외부에서 접근 할 수 없다
    ~~~
    const message=(function(){
        const secret="I am a secret";
        return `The secret is ${secret.length} character long`
    })();
    
    console.log(message);  //The secret is 13 character long
    ~~~

* 함수 스코프와 호이스팅
    * let 으로 변수를 선언하면 선언하기 전에는 존재하지 않는다. 호이스팅 X
    * var는 호이스팅으로 선언하기도 전에 사용 할 수 있다(선언한 변수를 끌어올린다)
    ~~~ 
    x; //undefined
    var x=3;
    x; //3
    ~~~        
    ->호이스팅
    ~~~
    var x; //위로 올라가진다
    x;
    x=3;
    x;
    ~~~
    * 전역 스코프 안에서 var 은 새로운 변수를 만들 수 없으며 let 로 가능했던 변수 숨김도 불가능  
    즉 블록안에서 var x 를 두번썼지만 변수는 x 하나뿐
    ~~~
    var x=3;
    if(x===3){
        var x=2;
        console.log(x);
    }
    console.log(x);
    ~~~
    ->호이스팅
    var x;
    x=3
    if(x===3){
        x=2;
        console.log(x);
    }
    console.log(x);

* 함수 호이스팅
    * var 과 마찬가지로 함수 선언도 스코프 맨 위로 끌어올려진다
    * 하지만 변수로 할당한 함수 표현식은 끌어올려지지 않는다
    ~~~
    f();
    let x= function f(){ //error 발생
        console.log('f');
    }
    ~~~         
   