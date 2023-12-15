fs = require('fs')
print = console.log

stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')


// A = Hash function on string to a number in 0 to 255
// P1 = Part 1 solution function, takes input data
// B = Install the lenses, takes input data m, and empty box collection b, and return a collection of lens-populated boxes
// P2 = Part 2 solution function P2, takes input data

stream = document.body.innerText
data = stream.replace('\r', '').replace('\n', '').split(',')

A  = w => w.split('').reduce((a,v)=>((a+v.charCodeAt(0))*17)%256,0)
P1 = m => m.reduce((a,v)=>a+A(v),0)
B  = (m,b) => m.reduce((a,v)=>v.includes('-')?a.has(n=A(l=v.slice(0
    ,-1)))?(a.get(n).reduce((x,y,z)=>y[0]==l?(x.splice(z,1),x):x,a.
    get(n)),a):a:a.has(n=A(l=v.split('=')[0]))?(l=a.get(n).reduce((
    x,y,z)=>y[0]==l?Math.max(z,x):x,-1))>-1?(a.get(n)[l][1]=v.split
    ('=')[1],a):(a.get(n).push(v.split('=')),a) : (a.set(n,[v.split
    ('=')]),a),b)
P2 = m => (b=>(r=b.values(),k=b.keys(),Array(b.size).fill(0).reduce
    ((x,_) => (bs=r.next().value,ks=k.next().value,x+ bs.reduce((c,
    v,z1) =>c+(ks+1)*(z1+1)*parseInt(v[1]),0)),0)))(B(m,new Map()))

print(B(data, new Map))

console.log('Part 1 is ... ', P1(data))
console.log('Part 2 is ... ', P2(data))



