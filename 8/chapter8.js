const arr=[1, null, "hello", "world", true, undefined]

delete arr[3];
console.log(arr.join());  //1,,hello,,true,
console.log(arr.join(''));//1hellotrue