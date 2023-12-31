fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')
// stream = fs.readFileSync('smallex', 'utf8')

// -- Day 17

// amount of heat loss if the crucible enters that block.
// at most three blocks in a single direction before it must turn 90 degrees left or right. The crucible also can't reverse direction; after entering each city block, it may only turn left, continue straight, or turn right.

// stream = document.body.innerText

// print = ()=>null

data = stream.replaceAll(/\r|\n$/g, '')
    .split('\n').map(line => line.split('').map(x => parseInt(x)))

width = data[0].length
height = data.length

// pos = [0, 0]

let records = new Map()

let min_score = Infinity

// ok so the path is joined by a 1-len, 2-len, or 3-len segments

D = [[-1, 0], [1, 0], [0, -1], [0, 1]] // dirs up0 down1 left2 right3

C = [[2, 3], [2, 3], [0, 1], [0, 1]] // changes dir to new dirs

A = (p, q) => p.map((x, i) => x + q[i]) // simple vector addition

K = (c, v) => v.map(x => c * x)   // simple vector scaling

I = p => 0 <= p[0] && p[0] < height && 0 <= p[1] && p[1] < width // check if pos inside grid

S = (pos, dir, size) => { // scoring segment
    let seg_score = 0
    let [r, c] = pos
    for (let i = 0; i < size; i++) {
        [r, c] = A([r, c], D[dir])
        seg_score = seg_score + parseInt(data[r][c])
    }
    return seg_score
}
t = function (v) {
    return (v + '')
}

tr = function (s) {
    return s.split(',').map(x => parseInt(x))
}

W = (a, b) => {
    // weight of segment from start, but not including start, to end
    // find orientation
    let start = tr(a)
    let end = tr(b)
    let seg_score = 0
    let dr = end[0] - start[0]
    let dc = end[1] - start[1]
    let mag = Math.max(Math.abs(dr), Math.abs(dc))
    dr = dr / mag
    dc = dc / mag
    for (let k = 1; k <= mag; k++) {
        seg_score += data[start[0] + k * dr][start[1] + k * dc]
    }
    return seg_score
}

// each node (r,c,orientation)
// where orientation 0 is up/down, 1 is left/right

nbrs = function (node) {
    let [r, c, o] = tr(node)
    let ns = [], dr, dc, no
    if (o) { dc = 1, dr = 0, no = 0 } else { dc = 0, dr = 1, no = 1 }
    for (let i = 4; i <= 10; i++) { // for ultra
        if (I([r + i * dr, c + i * dc])) { ns.push([r + i * dr, c + i * dc, no]) }
        if (I([r - i * dr, c - i * dc])) { ns.push([r - i * dr, c - i * dc, no]) }
    }
    return ns.map(x => t(x))
}
function explore() {
    // initial set of visited (position,dir)
    let visited = new Map()
    // initial frontier set and intially visited set
    let frontier = new Map()
    // for (let s = 4; s <= 10; s++) {
    //     //t([r,c,o]) is a node of r,c,orientation
    //     frontier.set(t([s, 0, 1]), true)
    //     visited.set(t([s, 0, 1]), W(t([0,0]),t([s,0])))

    //     frontier.set(t([0, s, 0]), true)
    //     visited.set(t([0, s, 0]), W(t([0,0]),t([s,0])))
    // }
    frontier.set('0,0,0',true)
    frontier.set('0,0,1',true)
    visited.set('0,0,0',0)
    visited.set('0,0,1',0)

    // print(frontier)
    while (frontier.size) {
        let new_frontier = new Map()
        let iter = frontier.entries()
        let ps
        while (ps = iter.next().value) {
            // for this frontier node
            let [node, _] = ps
            // print('---',node)
            // its neighbors are 
            let neighbor_list = nbrs(node) // a list
            // print(neighbor_list)
            // for each neighbor n  in the list
            for (let n of neighbor_list) {
                // check if n has been visited
                if (visited.has(n)) {
                    // if so update the score if it smaller
                    if (visited.get(node) + W(node, n) < visited.get(n)){
                        visited.set(n, visited.get(node) + W(node, n))
                        new_frontier.set(n,true)
                    }
                    // ?? and visit if smaller?
                    // going backwards bad idea?
                    // print(node,visited.get(node) + W(node, n))
                } else {
                    // we never been visited, we gonna add to new frontier
                    new_frontier.set(n,true)
                    // and set it to visited, and update the score
                    visited.set(n, visited.get(node) + W(node, n))
                    // print(node,visited.get(node) + W(node, n))
                }
                // ok we done checking the nbrs of this node
            }
            // well we never need the frontier again
            // no need to even delete it
            // frontier.delete(ps)
        }
        frontier = new_frontier

    }
    print(visited.get(t([height-1,width-1,0])))
    print(visited.get(t([height-1,width-1,1])))
}

explore()


print('--'.repeat(10))
console.log('min score is...', min_score)
// print(records)


print(nbrs('0,0,0'))
print(nbrs('0,0,1'))