var symbolProperty  = Symbol('key'); // Symbol(key)
var ob = {};

ob[symbolProperty] = 'value'

console.log(ob[symbolProperty] === 'value');
console.log(typeof symbolProperty === 'symbol');

console.log(ob);
// {Symbol(key): "value"}