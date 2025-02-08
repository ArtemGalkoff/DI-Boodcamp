const { addition, multiply } = require("./math.js");
const _ = require('lodash');

const sum = addition(3, 7);
const multi = multiply (3, 16)

console.log(sum);
console.log(multi);

const debounced = _.debounce(() => {
    addition(6, 6); 
  }, 2000);
debounced();
