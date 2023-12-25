const { format } = require('path')

fs = require('fs')
print = console.log
stream = fs.readFileSync('test.txt', 'utf8')
data = stream.replace(/\r/,'')

bound = 26987.89
vertices = (data.match(/middle(.*?)font/g))
count = 0
num_vertices = 0 
for(let line of vertices){
    num_vertices++
    if((parseFloat(line.split("x=\"")[1].split("\" y=")[0])) <= 26987.89){
        count++
    }
}
print(count * (num_vertices - count))

// Note to self: 
// Graphviz dot file format

// graph{
//     a -- {b c d}
//     b -- {x y}
// }

// and a -> b for direced edge

// and to run in cmd:
// dot -Tsvg input.dot > output.Tsvg
// or use -K sfdp tag for a different rendering