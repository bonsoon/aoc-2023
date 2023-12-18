const { inherits } = require('util')

fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')
// stream = fs.readFileSync('smallex', 'utf8')

// -- Day 18
data = stream.replaceAll(/\r/g, '').split('\n').map(u => u.split(' '))
// print(data)

let ground = new Map()
let cur_pos = [0, 0]
ground.set(cur_pos + '', true)

A = (p, q) => p.map((x, i) => x + q[i])

dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
for (let line of data) {
    let d = ['U', 'D', 'L', 'R'].indexOf(line[0])
    let dir = dirs[d]
    // print(d, dir)
    let m = parseInt(line[1])
    for (let k = 0; k < m; k++) {
        cur_pos = A(cur_pos, dir)
        ground.set(cur_pos + '', true)
        // print(cur_pos)
    }

}

// print(ground)
let width
let heigh
function gridify(map) {
    let iter = map.entries()
    let min_r = Infinity
    let max_r = -Infinity
    let min_c = Infinity
    let max_c = -Infinity
    while (t = iter.next().value) {
        let [r, c] = t[0].split(',').map(u => parseInt(u))
        min_r = Math.min(r, min_r)
        max_r = Math.max(r, max_r)
        min_c = Math.min(c, min_c)
        max_c = Math.max(c, max_c)
    }
    let grid = new Array(max_r - min_r + 1).fill().map(
        l => new Array(max_c - min_c + 1).fill(0)
    )
    height = max_r - min_r + 1
    width = max_c - min_c + 1
    iter = map.entries()

    while (t = iter.next().value) {
        let [r, c] = t[0].split(',').map(u => parseInt(u))
        grid[r - min_r][c - min_c] = 1
    }

    return grid
}
// gridify(ground)

let gg = gridify(ground)
for(let line of gg){
    print(line.join(''))
}

print(gg[1].indexOf(1))

// by experimenting, start at 1, gg[1].indexOf(1)+1 = 150

// now we frontier expand starting at 1,150



I = p => 0 <= p[0] && p[0] < height && 0 <= p[1] && p[1] < width // check if pos inside grid
nbrs = function (node) {
    let ns = []
    for (let d of dirs) {
        if (I(A(node, d))) {
            ns.push(A(node, d))
        }
    }
    return ns
}

print(nbrs([2, 2]))

function explore() {
    cur_pos = [1, 150]
    
    let seen = new Map()
    seen.set(cur_pos + '', true)
    
    let frontier = new Map()
    frontier.set(cur_pos+'',true)

    while(frontier.size){
        let iter = frontier.keys()
        let new_frontier = new Map()
        while(t = iter.next().value){
            let [r,c] = t.split(',').map(u=>parseInt(u))
            for(nb of nbrs([r,c])){
                let [nr,nc] = nb
                if(gg[nr][nc] == 1 || seen.has([nr,nc]+'') ){}
                else{
                    new_frontier.set([nr,nc]+'',true)
                    seen.set([nr,nc]+'',true) 
                }

            }
        }
        frontier = new_frontier
    }
    return seen
}

print('part 1 ........')
print(explore().size +gg.map(l => width - l.join('').replaceAll('1','').length).reduce((a,x)=>a+x,0))

print()
