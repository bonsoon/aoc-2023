fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')
// stream = fs.readFileSync('smallex', 'utf8')

// -- Day 19 Aplenty
startime = performance.now()

data = stream.replace(/\r/g, '').split('\n\n')
let [wf, pts] = data

// workflows
workflows = new Map()
data[0].split('\n').map(
    line => line.replace(/}/, '').split('{')
).forEach((val, i, arr) =>
    workflows.set(arr[i][0], arr[i][1].split(','))
)

// parts
parts = new Array()
pts.split('\n').map(u => u.replace(/{|}/g, '').split(','))
    .forEach((v, i, arr) => {
        let s = {}
        v.forEach(e => s[e.split('=')[0]] = parseInt(e.split('=')[1]))
        parts.push(s)

    })

function perform(work_name, part, s = 0) {
    let works = workflows.get(work_name)
    // print(work_name,works,s)
    if (s == works.length - 1) {
        if (works[s] == 'A') {
            A.push(part)
            return
        }
        if (works[s] == 'R') {
            R.push(part)
            return
        } else {
            perform(works[s], part, 0)
        }
        return
    }
    re = step(works[s], part)
    // print('..........',re)
    if (re == 0) {
        perform(work_name, part, s + 1)

    }
    else if (re == 'A') {
        A.push(part)
        return
    }
    else if (re == 'R') {
        R.push(part)
        return
    }
    else if (re != 1 || re != -1) {
        perform(re, part, 0)
    }

}

let A = []
let R = []

function step(inst, part) {
    if (inst.match(/</)) {
        let [p, v, t] = inst.split(/<|:/)
        if (part[p] < v) { return t }
    }
    if (inst.match(/>/)) {
        let [p, v, t] = inst.split(/>|:/)
        if (part[p] > v) { return t }
    }
    // if(inst.match(/A/)){
    //     A.push(part)
    //     return 1
    // }
    // if(inst.match(/R/)){
    //     R.push(part)
    //     return -1
    // }
    return 0
}

// print(workflows.get('in'))
// print(parts[0])
function part1() {
    for (let i = 0; i < parts.length; i++) {
        perform('in', parts[i])
    }

    let p1 = 0
    for (let p of A) {
        p1 += p.x + p.m + p.a + p.s
    }

    return p1
    // 406934
}
// part1()
// Ok, now part 2 we want all possible accepted inputs
// where x,m,a,s range from 1 to 4000

// Ok first we build a tree of all the labels
// and for each label, the children it leads to, as well as
// the complete rule as it moves into it

let worktree = new Map()

let iter = workflows.entries()
let ent = iter.next().value

while (ent != undefined) {
    [label, children] = ent
    children = children.map(s => s.split(':'))
    for (let i = 1; i < children.length; i++) {
        let cond = children[i - 1][0]
        let conds = cond.split(',')
        let idx = conds[conds.length - 1].match(/<|>/).index
        if (conds[conds.length - 1][idx] == '<') { ineq = '>=' } else { ineq = '<=' }
        if (children[i].length > 1) {
            children[i][0] =
                conds.slice(0, -1).join() + ',' + conds[conds.length - 1].slice(0, idx) + ineq + conds[conds.length - 1].slice(idx + 1) + ',' + children[i][0]
        }
        else {
            children[i].push(children[i][0])
            children[i][0] =
                conds.slice(0, -1).join() + ',' + conds[conds.length - 1].slice(0, idx) + ineq + conds[conds.length - 1].slice(idx + 1)
        }
        if (children[i][0][0] == ',') { children[i][0] = children[i][0].slice(1) }
    }
    worktree.set(label, children)
    ent = iter.next().value
}
// print('- - '.repeat(2))
// print(worktree)

// print(workflows.get('in'))

// Now we need a function that computes the new range

// ran = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }
// rule = 'x<=2487,x>=2994,s<3010'

function compute(rule, ran) {
    let new_ran = structuredClone(ran)
    let rule_list = rule.split(',')
    for (let rule of rule_list) {
        let c = rule[0]
        if (rule.includes('<=')) {
            let num = parseInt(rule.slice(3))
            new_ran[c][1] = Math.min(num, new_ran[c][1])
        }
        else if (rule.includes('>=')) {
            let num = parseInt(rule.slice(3))
            new_ran[c][0] = Math.max(num, new_ran[c][0])
        }
        else if (rule.includes('<')) {
            let num = parseInt(rule.slice(2)) - 1
            new_ran[c][1] = Math.min(num, new_ran[c][1])
        }
        else if (rule.includes('>')) {
            let num = parseInt(rule.slice(2)) + 1
            new_ran[c][0] = Math.max(num, new_ran[c][0])
        }
    }
    return new_ran
}

// Now we perform DFS and explore

function explore(label, ran = { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }, valids = []) {
    // print(label,ran)
    if (label == 'A') {
        valids.push(ran)
        return
    }
    if (label == 'R') {
        return
    }
    let children = worktree.get(label)
    for (let e of children) {
        let new_ran = compute(e[0], ran)
        explore(e[1], new_ran, valids)
    }
    return valids
}

function part2() {
    valids = explore('in')
    let p2 = 0
    for (let e of valids) {
        p2 += (e.x[1] - e.x[0] + 1)
            * (e.m[1] - e.m[0] + 1)
            * (e.a[1] - e.a[0] + 1)
            * (e.s[1] - e.s[0] + 1)
    }
    return p2
}

print('part 1...', part1())
print('part 2...', part2())

print(performance.now() - startime, 'ms')