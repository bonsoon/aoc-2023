// --- Day 23: A Long Walk ---

fs = require('fs')

stream = fs.readFileSync('input', 'utf8')

tt = performance.now()
print = console.log

// part 1: find longest path with slope tiles > v. 

data = stream.replace(/\r/g, '').split(/\n/)
const start_pos = [0, data[0].indexOf('.')]
const end_pos = [data.length - 1, data[data.length - 1].indexOf('.')]
const equals = (a, b) => a[0] == b[0] && a[1] == b[1]
const add = (a, b) => [a[0] + b[0], a[1] + b[1]]
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]] // U D L R
let part1 = 0
function dfs(pos, path) {
    // print(pos)
    if (equals(pos, end_pos)) {
        part1 = Math.max(part1, path.size)
        return
    }
    let adjs = dirs
    if (">v".includes(data[pos[0]][pos[1]])) {
        adjs = {
            'v': [[1, 0]],
            '>': [[0, 1]]
        }[data[pos[0]][pos[1]]]
    }
    for (let a of adjs) {
        let nb = add(a, pos)
        if (data?.[nb[0]]?.[nb[1]] != undefined &&
            data[nb[0]][nb[1]] != '#'
            && !path.has('' + nb)) {
            path.add('' + nb)
            dfs(nb, path)
            path.delete('' + nb)
        }
    }
}
dfs(start_pos, new Set())
print('part 1 is ...', part1)

// part 2: find longest path, disregard slope tiles
// dfs call stack will exceed, so we should abstract the graph
// first find all the branch points

let branchpoints = [start_pos]
// naive scan for those with greater than 2 neighbors
for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[0].length; c++) {
        if (data[r][c] != '#') {
            let nbs = 0
            for (let a of dirs) {
                let nb = add(a, [r, c])
                if (data?.[nb[0]]?.[nb[1]] != undefined &&
                    data[nb[0]][nb[1]] != '#') {
                    nbs++
                }
            }
            if (nbs > 2) {
                branchpoints.push([r, c])
            }
        }
    }
}
branchpoints.push(end_pos)

// now look for the distances between these nodes
// remember to ignore the slopes!

function distance(a, b, avoid) {
    if(a==b){return 0}

    let max_distance = -1
    function dfs(pos, path) {
        // print(pos)
        if (equals(pos, b)) {
            max_distance = Math.max(max_distance, path.size)
            return
        }
        let adjs = dirs
        for (let a of adjs) {
            let nb = add(a, pos)
            if (data?.[nb[0]]?.[nb[1]] != undefined &&
                data[nb[0]][nb[1]] != '#'
                && !path.has('' + nb)
                && ('' + nb == '' + b || !avoid.includes('' + nb))) {
                path.add('' + nb)
                dfs(nb, path)
                path.delete('' + nb)
            }
            if (max_distance > 0){break}
        }
    }
    dfs(a, new Set())
    return max_distance
}

let distancematrix = new Array(branchpoints.length).fill(null).map(u=>new Array(branchpoints.length).fill(null).map(u=>-1))
for (let a = 0; a < branchpoints.length; a++) {
    for (let b = a; b < branchpoints.length; b++) {
        distancematrix[a][b]= distance(branchpoints[a], branchpoints[b], branchpoints.map(u => u + ''))
        distancematrix[b][a]= distancematrix[a][b]
    }
}
// for(let line of distancematrix){
//    print( line.map(u=>''+u).map(u=>' '.repeat(3-u.length)+u).join(' '))
// }

function pathlength(path) {
    let p = [...path].map(u => u[0])
    let length = 0
    for (let i = 1; i < p.length; i++) {
        length += distancematrix[p[i - 1]][p[i]]
    }
    return length
}

let part2 = 0
function dfs2(pos, path) {
    // print(pos)
    if (pos == distancematrix.length - 1) {
        let l = pathlength(path)
        if (l > part2) {
            part2 = l
        }
        return
    }
    for (let nb = 0; nb < distancematrix.length; nb++) {
        if (distancematrix[pos][nb] > 0 && !path.has(nb)) {
            path.set(nb)
            dfs2(nb, path)
            path.delete(nb)
        }
    }
}
dfs2(0, new Map().set(0))
print('part 2 is ...', part2)
print(performance.now() - tt, 'ms')