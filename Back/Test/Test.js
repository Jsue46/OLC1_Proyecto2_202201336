var fs = require('fs')
var parser = require('../Parser/Parser')
fs.readFile('../../Inputs/Prueba.txt',(err,data) => {
    if(err) throw err
    let string = data.toString()
    console.log(parser.parse(string))
})