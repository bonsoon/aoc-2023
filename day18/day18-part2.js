const { inherits } = require('util')

fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')
// stream = fs.readFileSync('smallex', 'utf8')

// -- Day 18 Part 2
data = stream.replaceAll(/\r/g, '').split('\n').map(u => u.split(' '))
// print(data)

let ground = new Map()
let cur_pos = [0, 0]
let corners = []
corners.push(cur_pos)

A = (p, q) => p.map((x, i) => x + q[i])
K = (c, p) => p.map((x, i) => c * x)

dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]

let bdry = 0


for (let line of data) {
// part 1
    // let d = ['U', 'D', 'L', 'R'].indexOf(line[0])
    // let dir = dirs[d]
    // let m = parseInt(line[1])
    
    // part 2
    let newline = line[2].replace(/\(|\)|\#/g,'')
    let d = parseInt(newline[newline.length - 1])
    let dir = [[0,1],[1,0],[0,-1],[-1,0]  ][d]
    let m = parseInt(newline.slice(0,-1),16)
    // print(m)
    
    
    bdry+= m
    // print(d, dir)
    // if(d==0 || d == 1){
    //     // print(m)
    //     bucket_updown.push(m)
    // }
    cur_pos = A(cur_pos, K(m,dir))
    corners.push(cur_pos)
}

// we gotta gauss shoelace and picks
// gauss gives area of polygon (1/2) sum det(p,q) , where p,q are succusive vertices
// picks formula gives 

det = function (p,q){
    return p[0]*q[1] - p[1]*q[0]
}
print(corners[corners.length-1])
corners.push([0,0])
let g = 0
for(let k=0; k < corners.length-1;k++){
    g+= det(corners[k],corners[k+1])
}
area = Math.abs(g/2)
print('area is  ...' , area)
print('bdry is  ,,,' , bdry)

part2 = (2 * area + 2 - bdry)/2 + bdry

print('part 2 is .....' , part2)