fs = require('fs')
print = console.log
stream = fs.readFileSync('test.txt', 'utf8')
data = stream.replace(/\r/,'')

bound = 26987.89
vertices = (data.match(/middle(.*?)font/g))
count = 0
num_vertices = 0 
xs = []
for(let line of vertices){
    num_vertices++
    let x = parseFloat(line.split("x=\"")[1].split("\" y=")[0])
    xs.push(x)
    if(x <= 26987.89){
        count++
    }
}
print('part 1 ... ', count * (num_vertices - count))

// another hack: find the largest difference in the x-coords
// that is whewre the cut occurs!

xs.sort((a,b)=>a-b)
let max = 0
let index = 0
for(let i = 1; i < xs.length; i++){
    if(xs[i]-xs[i-1] > max){
        max = xs[i]-xs[i-1]
        index = i
    }
}
print('another way', (index)*(num_vertices - index))

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

// const { execSync } = require('child_process');
// execSync('dot -Tsvg g2.dot > test.txt'); 