## 배열
* 배열 추가 제거
    * push, pop은 각각 배열 끝에 추가하거나 제거
    ~~~
    const arr=["b", "c", "d"];
    arr.push("e"); //arr : b, c, d, e
    ~~~
    * shift, unshif 각각 배열 첫번째 요소를 제거하거나 추가
    
    * concat은 배열의 끝에 여러요소를 추가한 사본을 반환
    ~~~
    const arr=[1,2,3];
    arr.concat(4,5,6);
    
    console.log(arr);//1 2 3 arr은 변하지않는다
    ~~~

* 배열 일부 가져오기
    * slice 첫번째 변수는 어디서부터 가져올지 두번째는 어디까지 가져올지(바로 앞 인덱스)
    * 첫번째 인자부터 시작해서 두번째 인자 전까지 가져온다
    ~~~
    const arr=[1,2,3,4,5];    
    console.log(arr.slice(2,3)); //3 slice도 arr은 변하지 않는다
    console.log(arr.slice(-2,-1)); //4
    ~~~
    
* 특정 값으로 채우기
    * es6 에서 fill 메서드 도입, 정해진 값으로 배열을 채운다
    * 1 채우려는 값 2 시작 인덱스 3 마지막 인덱스(그 앞가지 채움)
    ~~~
    const arr=new Array(5).fill(1);
    arr.fill('b', '1','2');
    
    console.log(arr); //[ 1, 'b', 1, 1, 1 ]
    ~~~

* 배열 정렬 역순 정렬
    * reverse 이름 그대로 배열 요소의 순서를 반대로 바꿈
    ~~~ 
    const arr=[1,2,3,4,5];
    arr.reverse(); //5,4,3,2,1    
    ~~~    
    * sort는 배열순서를 정렬
    ~~~
    const arr=[5,3,2,1,4];
    arr.sort(); //1.2.3.4.5
    
    const arr=[{name:"Suza"}, {name:"JIM"},
        {name:"Trevor"}, {name:"Amanda"}
    ];
    arr.sort((a,b)=>a.name>b.name); //name프로퍼티의 알파벳 순으로 정렬
    arr.sort((a,b)=>a.name[1]<b.name[1]); //name 프로퍼티의 두번째 글자의 알파벳 역순으로 정렬
    ~~~

* 배열 검색
    * indexOf는 찾고자 하는것과 정확히 일치한 첫번째 요소 인덱스를 반납
    * lastIndexOf는 배열의 끝에서부터 검색
    * findIndex는 보조함수를 써서 검색조건 지정가능
    ~~~
    const arr=[{id:5, name:"Judith"}, {id:7, name:"Francis"}];
    
    console.log(arr.findIndex(o=>o.id===5));  //0 
    console.log(arr.findIndex(function(o){return o.id===5})); //0
    ~~~
    
* map과 filter
    * map과 filter는 배열요소를 변환시키지만 사본을 반환한다
    * Map은 배열요소를 변형할때 사용한다
    * Map 인자 첫번째는 배열 두번째는 인덱스
    ~~~
    const cart=[{name:"Widget", price:9.95}, {name:"Gadget", price:22.95}];
    
    const name=cart.map(x=>x.name);
    
    console.log(cart.map(x=>x.name)); //[ 'Widget', 'Gadget' ]
    console.log(cart.map(x=>x.price));//[ 9.95, 22.95 ]
    console.log(cart.map(function(x){ 
        return x.price;
    }))
    ~~~        
    
    * Filter는 배열에 필요한 것만 남길 목적으로 만듬. Map과 같이 사본반납
    * 즉 어떤 요소를 남길지 판단할 함수를 넘긴다 -> return 이 true인 것만 모아  
      새로운 배열을 만든다
      
    ~~~
    const cards=[];
    
    for(let suit of ['H', 'C', 'D','S'])       //모든 카드에 숫자 1~13 넣는다
        for(let value=1; value<=13; value++)
            cards.push({suit, value})
    
    //value 가 2인 카드
    cards.filter(c=>c.value==2);
        
    //다이아몬드만
    console.log(cards.filter(c=>c.suit==='D'));
    ~~~
    
* REDUCE
    * reduce는 배열 자체를 변형한다
    * reduce 콜백의 첫번째 요소는 배열이 줄어드는 대상이고 두번째부터 배열요소, 현재 인덱스, 배열
    * 마지막 요소는 초기값
    ~~~
    const arr=[5,7,2,4];
    const sum=arr.reduce((a,x)=>a+=x,0);
    
    console.log(sum)
    ~~~
    * 첫번째 배열5에서 익명함수 호출 a는 0이고 x가 5 이고 합을 반환한다
    * 반환된값이 다음단계에서 a 값이 되고 x는 7이된다
    
    * 초기값 0이 없는 경우
    ~~~
    const sum=arr.reduce((a,x)=>a+=x);
    ~~~
    *첫번째 요소 a가 5 x가 7이 되며 여기의 합 12가 다음 a 요소가 된다    
    
    ~~~
    const words=["Beachball", "Rodeo", "Angel", "November"];
    
    const longwords= words.reduce((a,w)=>w.length>6? a+ " " + w:a, "").trim();
    
    console.log(longwords); //Beachball November
    //filter 와 join으로 만들어보
    ~~~
    
* 삭제되거나 정의되지 않는 요소들
    * 배열 중간을 삭제하면 가운데 구멍이 생긴다
    ~~~
    const arr= [1,2,3,4,5];
    
    delete arr[2];
    
    console.log(arr); //[ 1, 2, <1 empty item>, 4, 5 ]
    console.log(arr.map(x=>0)); //[ 0, 0, <1 empty item>, 0, 0 ]
    ~~~    
    
* 문자열 병합(Array.protype.join)
    * 문자열 요소를 합칠때 정의되지 않은 요소, 삭제된 요소, null, undefined 는 모두 빈 문자열 취급함
    * 매개 변수가 생략되었을때 기본값은 쉼표이다
    ~~~
    const arr=[1, null, "hello", "world", true, undefined]
    
    delete arr[3];
    console.log(arr.join());  //1,,hello,,true,
    console.log(arr.join(''));//1hellotrue
    ~~~    
    
    