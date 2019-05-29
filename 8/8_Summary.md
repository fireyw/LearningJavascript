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