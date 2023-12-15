fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
stream = fs.readFileSync('sample', 'utf8')

// Day 15 : Lens Library
// A = Hash function on string to a number in 0 to 255
// P1 = Part 1 solution function, takes input data
// B = Install the lenses, takes input data m, and empty box 
//    collection b, and return a collection of lens-populated boxes
// P2 = Part 2 solution function P2, takes input data

// Copy/paste below and run directly in console of puzzle input
// https://adventofcode.com/2023/day/15
// https://adventofcode.com/2023/day/15/input

// stream = document.body.innerText
data = stream.replace('\r', '').replace('\n', '').split(',')

A  = w => w.split('').reduce((a,v)=>((a+v.charCodeAt())*17)%256,0)
P1 = m => m.reduce((a,v)=>a+A(v),0)
B  = m => m.reduce((a,v)=>v.includes('-')?a.has(n=A(l=v.slice(0
    ,-1)))?(a.get(n).reduce((x,y,z)=>y[0]==l?(x.splice(z,1),x):x,a.
    get(n)),a):a:a.has(n=A(l=v.split('=')[0]))?(l=a.get(n).reduce((
    x,y,z)=>y[0]==l?Math.max(z,x):x,-1))>-1?(a.get(n)[l][1]=v.split
    ('=')[1],a):(a.get(n).push(v.split('=')),a) : (a.set(n,[v.split
    ('=')]),a),new Map())
P2 = m => (b=>([...b.entries()].reduce((x,v) =>(v[0],x+ v[1].reduce
    ((c,l,z) =>c+(v[0]+1)*(z+1)*(0+l[1]),0)),0)))(B(m))

console.log('Part 1 is ... ', P1(data))
console.log('Part 2 is ... ', P2(data))

print(data[1])
print(data[1].split(/-|=/).forEach(([a,b]) => print(a,b)))

const lenses = new Map();
data.map(step => step.split(/-|=/)).forEach(([label, lens]) => (lens ? lenses.set(label, lens) : lenses.delete(label)));
print(lenses)
print([...lenses.entries()])

bb = B(data)
print([...bb.entries()][2])


    
print(P2(data))