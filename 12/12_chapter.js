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