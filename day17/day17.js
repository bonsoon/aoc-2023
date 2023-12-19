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

t = function (v) {
    let [r, c, o] = v
    return (r * height + c + o * width * height)
    // return (v + '')
}

tr = function (s) {
    let o = (s / width / height << 1 >> 1)
    let r = (s - o * width * height) / height << 1 >> 1
    let c = s % height
    return [r, c, o]
    // return s.split(',').map(x => parseInt(x))
}

W = (a, b) => {
    // weight of segment from start, but not including start, to end
    // find orientation
    let start = tr(a)
    let end = tr(b)
    let seg_score = 0
    let dr = end[0] - start[0]
    let dc = end[1] - start[1]
    let mag = Math.abs(dr) + Math.abs(dc)
    dr = dr / mag
    dc = dc / mag
    for (let k = 1; k <= mag; k++) {
        seg_score += data[start[0] + k * dr][start[1] + k * dc]
    }
    return seg_score
}

// each node (r,c,orientation)
// where orientation 0 is up/down, 1 is left/right

nbrs = function (node, min = 1, max = 3) {  // default min=1, max=3, allowed flexibility for part 2
    let [r, c, o] = tr(node)
    let ns = [], dr, dc, no
    if (o) { dc = 1, dr = 0, no = 0 } else { dc = 0, dr = 1, no = 1 }
    for (let i = min; i <= max; i++) {
        if (I([r + i * dr, c + i * dc])) { ns.push([r + i * dr, c + i * dc, no]) }
        if (I([r - i * dr, c - i * dc])) { ns.push([r - i * dr, c - i * dc, no]) }
    }
    return ns.map(x => t(x))
}


function explore(min = 1, max = 3) {
    // initial set of visited (position,dir)
    let visited = new Map()
    // initial frontier set and intially visited set
    let frontier = new Map()
    frontier.set(t([0, 0, 0]))
    frontier.set(t([0, 0, 1]))
    visited.set(t([0, 0, 0]), 0)
    visited.set(t([0, 0, 1]), 0)
    // print(frontier)
    while (frontier.size) {
        draw_f(data,frontier)
        // print(frontier.size)
        let new_frontier = new Map()
        let iter = frontier.keys()
        // print(iter)
        let ps
        while ((ps = iter.next().value )> -1) {
            // for this frontier node
            let node = ps
            // print('---',node)
            // its neighbors are 
            let neighbor_list = nbrs(node, min, max) // a list
            // print(neighbor_list)
            // for each neighbor n  in the list
            for (let n of neighbor_list) {
                // check if n has been visited
                if (visited.has(n)) {
                    // if so update the score if equal or smaller
                    if (visited.get(node) + W(node, n) <= visited.get(n)) {
                        visited.set(n, visited.get(node) + W(node, n))
                        new_frontier.set(n)
                    }
                    // ?? and visit if smaller?
                    // going backwards bad idea? or not.. i think we need
                    // print(node,visited.get(node) + W(node, n))
                } else {
                    // we never been visited, we gonna add to new frontier
                    new_frontier.set(n)
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
        // print(minMap(new_frontier))

    }
    // print('total visits...', visited.size)
    return [Math.min(visited.get(t([height - 1, width - 1, 0])),
        visited.get(t([height - 1, width - 1, 1]))
    ), visited]

}
ts = performance.now()
print('total nodes are width * height * 2 is ...', width * height * 2)
print('--'.repeat(10))
let [p1, path1] = explore()
print('part 1 ... ', p1)


let [p2, path2] = explore(4, 10)
print('part 2 ... ', p2)
print((performance.now() - ts) / 1000, 'seconds')

// part 1 ...  1128
// part 2 ...  1268
// 17.366123699963094 seconds

// Visualization stuff

heat = '███▓▓▒▒░░ x'

// print(data)

function draw(m) {
    m.forEach(line =>
        print(line.reduce((acc, v) => acc + heat[v], ''))
    )
}

function draw_f(d,f){
    console.clear()
let nd = structuredClone(d)
let iter = f.keys()
while((n = iter.next().value)>-1){
    let [r,c] = tr(n)
    nd[r][c] = 10
}
nd.forEach(line =>
    print(line.reduce((acc, v) => acc + '███▓▓▒▒░░ x'[v], ''))
)
}


// draw(data)