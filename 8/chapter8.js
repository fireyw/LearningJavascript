const arr=[{id:5, name:"Judith"}, {id:7, name:"Francis"}];

console.log(arr.findIndex(o=>o.id===5));
console.log(arr.findIndex(function(o){return o.id===5}));