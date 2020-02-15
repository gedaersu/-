let module1 = require('./modules/module1')
let module2 = require('./modules/module2')
let module3 = require('./modules/module3')

let uniq = require('uniq')
let fs = require('fs')

//使用模块

  module1.foo();
  module2();
  module3.foo();
  module3.bar();
  uniq(module3.arr)

let result = uniq(module3.arr)
console.log(result)

