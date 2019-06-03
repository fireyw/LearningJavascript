## 객체와 객체지향 프로그래밍
* 배열과 객체
    * 배열: 값을 가지며 각 값에는 숫자형 인덱스가 있다
    * 객체: 프로퍼티를 가지며 각 프로퍼티에는 문자열이나 심볼 인덱스가 있다
        * 프로퍼티란 : 객체에 속한 DATA를 의미  
          ex)아래에서 name, age, occu는 person 객체의 프로퍼          
        ~~~
        var person = {
         name: "Jason",
         age: 25,
         occupation: "Student",
         getPersonProfile: function() {
          return "Name : " + this.name +
           "\nAge : " + this.age +
           "\nOccupation : " + this.occupation;
         }
        };
       ~~~

* 프로퍼티 나열
    * 순서가 보장되지 않는다
    * for... in : 객체 프로퍼티를 나열할때 주로 사용
    ~~~
    const SYM = Symbol();
    
    const o= {a:1, b:2, c:3, [SYM]:4};
    
    for(let prop in o){
        if(!o.hasOwnProperty(prop)) continue;
        console.log(`${prop}: ${o[prop]}`);
        // a: 1
        // b: 2
        // c: 3
        // 키가 심볼인 프로퍼티는 포함되지 않는다
    } 
    ~~~
    * Object.keys 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환
    ~~~
    const o={apple:1, xochitl:2, balloon:3, guitar:4, xylophone:5,};
    
    Object.keys(o)
            .filter(prop=>prop.match(/^x/))
            .forEach(prop=>console.log(`${prop}: ${o[prop]}`));
    // xochitl: 2
    // xylophone: 5        
    ~~~
    
* 객체지향 프로그래밍
    * 객체: 데이터와 기능을 논리적으로 묶어놓은것  
        ex) 객체: 자동차
            data: 제조사 모델 차량번호 
            function: 가족 변속 문열기
    * 클래스: 어떤 자동차처럼 추상적이고 범용적인것
    * 인스턴스: 특정 자동차처럼 구체적이고 한정적인것
    * 기능 : 메서드
    * 클래스 메서드: 클래스엔 속하지만 특정 인스턴스에 묶이지 않는 기능 
        ex(시동을 거는 기능)
    ~~~
    클래스: 운송수단 -> 자동차의 슈퍼 클래스, (부모)
                    자동차르 운송수단의 서브 클래스
    ~~~                   
    * 다른 객체지향 언어와 다르게 car1.userGear='X' 를 막는 매커니즘이 없다  
    * 프로퍼티 앞에 가짜 접근 제한 _  를 붙임으로 알려준다    
    ~~~
    class Car{
        constructor(make, model){
            this.make=make;
            this.model=model;
            this._useGears= ['P','N', 'R', 'D']
            this._useGear=this._useGears[0];
        }
    
        get userGear(){return this._useGear};
        set userGear(value){
            if(this.useGears.indexOf(value)<0)
                throw new Error(`Invalid gear: ${value}`);
            this._useGear=gear;
        }
    
        shift(gear){
    
            this.useGear=gear;
        }
    }
    
    
    const car1= new Car("Tesla", "Model S");
    const car2= new Car("Mazda", "3i");
    
    car1.shift('D');
    car1.shift('R');

    ~~~
    
    * 클래스는 함수이다
        typeof car //function
        
            
                            
    
    
    