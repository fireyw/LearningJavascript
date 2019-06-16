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

findNeedle(['hay','hay','hay','hay','needle','hay','hay']);


var fruits = ["Apple", "Banana", "Orange", "Strawberry"];
var shift = fruits.shift();
console.log(shift);
console.log(fruits);
