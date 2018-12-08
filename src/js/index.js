var unique = require('uniq')
var add = require('./mymodule')
var $ = require('jquery')

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6]

console.log(unique(data))

console.log(__filename)
console.log(__dirname)

// $(document).ready(function () {

//     $('#root').text(unique(data) + '\r' + add(1, 2))

//     $('#btn-sum').click(function () {
//         var x = $('#x').val()
//         var y = $('#y').val()
//         $('#sum').val(add(x, y))
//     })
// })

