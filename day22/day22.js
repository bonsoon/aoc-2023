// --- Day 22: Sand Slabs ---

fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')
// stream = fs.readFileSync('sample2', 'utf8')

let tt = performance.now()

between = (p, q) => {
    let r = []
    o = q.map((v, i) => v - p[i]).map(u => u != 0).indexOf(true)
    if (o == -1) { return [structuredClone(p)] }
    else {
        for (let i = 0; i <= q[o] - p[o]; i++) {
            let g = structuredClone(p)
            g[o] += i
            r.push(g)
        }
        return r
    }
}

overlap = (a, b) => {
    let result = false
    for (let p of a) {
        for (let q of b) {
            result = result || (p[0] == q[0] && p[1] == q[1] && p[2] == q[2])
        }
    }
    return result
}

class Brick {
    constructor(description,idx) {
        this.snapshot = this.parse(description)
        this.idx = idx
        // this.collection = bricks
    }
    parse(description) {
        let [h, t] = description.split('~')
            .map(x => x.split(',').map(u => parseInt(u)))
        return between(h, t)
    }
    fall() {
        let base = this.snapshot.reduce((a, v) =>
            Math.min(a, v[2]), Infinity)
        if (base > 0) {
            let preview = this.snapshot.map(p => [p[0], p[1], p[2] - 1])
            let canfall = true
            for (let brick of bricks) {
                if (brick.idx != this.idx) {
                    // print(overlap(brick.snapshot, preview))
                    canfall = canfall && !overlap(brick.snapshot, preview)
                }
            }
            if (canfall) {
                this.snapshot = preview
                // print('falling!')
                return true
            }
            else{return false}
        }
        return false
    }
    ontopof(){
        let preview = this.snapshot.map(p => [p[0], p[1], p[2] - 1])
        for (let brick of bricks) {
            if (brick.idx != this.idx && overlap(brick.snapshot, preview)) {
            //    print(this.idx, ' is on top of ' , brick.idx)
               if(supportingtree.has(brick.idx)){
                supportingtree.get(brick.idx).push(this.idx)
               }
               else{
                supportingtree.set(brick.idx,[this.idx])
               }

               if(dependencytree.has(this.idx)){
                dependencytree.get(this.idx).push(brick.idx)
               }
               else{
                dependencytree.set(this.idx,[brick.idx])
               }
            }
        }
    }
}


data = stream.replace(/\r/g, '').split('\n')


bricks = []
stack = new Map()

data.forEach((x,i) => bricks.push(new Brick(x,i)))

stabailized = false
print('simulating falling.......')
while(!stabailized){
    let thingsfell = false
    bricks.forEach(b=>
        {
            while(b.fall()){
                thingsfell = true
            }
        }
        )
        // print(thingsfell)
    stabailized = !thingsfell
}
print('stabilized..........')
print('that took ', performance.now() - tt)
supportingtree = new Map()
dependencytree = new Map()
print('building dep and supp tree......')

for(b of bricks){
    b.ontopof()
}

print('that took ', performance.now() - tt)


// print(supportingtree)
// print(dependencytree)


// // print(dependencytree)

let p1 = 0
let p2 = 0 

print("determining what cause what to fall initially ")

let causefall = new Map()
for(let i = 0; i<  bricks.length;i++){
    causefall.set(i,[])
}

for(let i = 0; i<  bricks.length;i++){
    let canremove = true
    let beingsupported = supportingtree.get(i)
    // print('brick', i, 'suppporting', beingsupported)
    if(beingsupported){
    for(let c of beingsupported){
        // print(c, 'depends on', dependencytree.get(c))
        if(dependencytree.get(c).length == 1){
            // print(i, ' cannot be removed')
            canremove = false
            causefall.get(i).push(c)
        }
        // else{print(i, ' can be removed')}
    }}
    else{}
    if(canremove){
        // print(i, ' can be removed')
        p1++
    }
}

// print(causefall)
print('that took ', performance.now() - tt)

print("determining chain reaction ... ")

for(let cur_b = 0 ; cur_b < bricks.length; cur_b++)
{

let v = causefall.get(cur_b)
let plength = 0
let clength = v.length
while(plength!=clength)
{
    plength = clength
    clone_support = structuredClone(supportingtree)
    clone_dependency = structuredClone(dependencytree)
    // print(clone_dependency)
    iter = clone_dependency.entries()
    while(pp = iter.next().value){
        let new_dep = []
        let [idx,deps] = pp
        // print(deps)
        for(let d of deps){
            // print(v.includes(d), ' do we need', d)
            if(!v.includes(d)){
                new_dep.push(d)
            }
        }
        if(new_dep.length == 0){v.push(idx)}
        clone_dependency.set(idx,new_dep)
    }
    v = new Set(v)
    v = [...v]
    // print(clone_dependency)
    clength = v.length
}
p2+=v.length
}
print('that took ', performance.now() - tt)


// let chainrxn = new Map()
// for(let b of bricks){
//     let clone = structuredClone(bricks)
//     clone.splice(b.idx,1)
//     removable = true
//     let chain = new Map()
//     for(let c of clone){
//         if(canfall(c,clone)){
//             removable = false
//             chain.set(c.idx)
//         }
//     }
//     if(removable){
//         print(b.idx)
//         p1++
//     }
//     chainrxn.set(b.idx, chain)
// }

// function canfall(b,collection) {
//     let base = b.snapshot.reduce((a, v) =>
//         Math.min(a, v[2]), Infinity)
//     if (base > 0) {
//         let preview = b.snapshot.map(p => [p[0], p[1], p[2] - 1])
//         let canfall = true
//         for (let brick of collection) {
//             if (brick.idx != b.idx) {
//                 // print(overlap(brick.snapshot, preview))
//                 canfall = canfall && !overlap(brick.snapshot, preview)
//             }
//         }
//         if (canfall) {
//             // b.snapshot = preview
//             // print('falling!')
//             return true
//         }
//         else{return false}
//     }
//     return false
// }

print('part 1 is ...', p1)
print('part 2 is ...', p2)

// 2979 is too low