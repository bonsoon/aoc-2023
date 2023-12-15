fs = require('fs')
print = console.log

display = m => { for (line of m) { print(line) } }

// P = pipe function, that will be useful to pipe compositions
// T = transposes the board
// L = rotate the board CW. Hmm, it is transpose followed by reverse
// Q = slides rock type O eastwards completely until obstructed for a row
// E = slides all rocks of type O eastwards for all rows on the board
// I need to check if this is sufficient. Let's say it is LOL.
// N = slide north now is just N = LLLEL
// A = load of the support beam of the board m

// Ok part 2 -- we need to repeat this a bajillion cycles. Each cycle is a N, W, S, E slide move
// Now, N = LLLEL , W = LLELL, S = LELLL, and E = E. Note LLLL = 1.
// So one cycle C = ESWN = E LELLL LLELL LLLEL = EL EL EL EL.
// Now, a bajillion = 1000000000. We need to find the load after a bajillion cycles.
// If this repeats, which intuitively would as it is finite -- ish, 
// then the pair (boardstate, load score) is unique.
// Actually, let us just find the cycle number of next repeated board state.
// We can be bold and use the score. Let trial this

// Kind of tricky to avoid using mutable things.
// But we can pass a memoization device q into it recursively. Same technique from memoization.

// Here Z = finds when a cycle starts, and the period
// Ok great, now we need to produce that segment, cycle 93, to 72 later
// Actually, we can get that from our memoized device q in Z !

// Finally we can solve for Day 14, take a bajillion
// print((1000000000 - s) % p + s)
// print(q.reduce((a,v)=> v[0] == ((1000000000 - s)%p + s )?  a + v[0] : a  , 0))

stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')

t = performance.now()
stream=document.body.innerText
data = stream.replaceAll('\r', '').replace(/\n$/, '').split('\n')

// P = Piping function useful for composition later.
P=(...fs)=>(x)=>fs.reduce((a,f)=>f(a),x)
// T = transposes the board
T=m=>m[0].split('').map((_,k)=>(k=>m.map(u=>u[k]).join(''))(k))
// L = rotate the board CW. It is transpose followed by reverse
L=m=>T(m).map(u=>u.split('').reverse().join(''))
// Q = slides rock type O eastwards completely until obstructed for a row
Q=x=>x.split(/#/).reduce((a,v)=>a+'.'.repeat(b=v.replaceAll('O','').length)+'O'.repeat(v.length-b)+'#','').slice(0,-1)
// E = slides all rocks of type O eastwards for all rows on the board
E=m=>m.map(e=>Q(e))
// N = slide north now is just N = LLLEL
N=m=>P(L,E,L,L,L)(m)
// A = computes the load of the support beam of the board m
A=m=>m.reduce((a,v,i)=>a+(v.length-v.replaceAll('O','').length)*(m.length-i),0)
// U = slides rock type O westwards completely until obstructed for a row
U=x=>x.split(/#/).reduce((a,v)=>a+'#'+'O'.repeat(v.length-(b=v.replaceAll('O','').length))+'.'.repeat(b),'').slice(1)
// W = slides all rocks of type O westwards for all rows on the board
W=m=>m.map(e=>U(e))
// C = ESWN = ETETWTWT is one full cycle, as slide north N and south S are compositions of transposes : N = TWT and S = TET
C=m=>P(T,W,T,W,T,E,T,E)(m)
// Z = finds when a cycle starts, and the period of the cycle, with memoization
Z=(m,q,i)=>q.has(y=m.join())?[q.get(y)[0],i-q.get(y)[0],q]:(q.set(y,[i,A(m)]),Z(C(m),q,i+1))
// J = fines the desired load value after some number of cycles
J=(r,x)=>(u=r.next().value)[0]==x?u[1]:J(r,x)

console.log('part 1 is ... ', A(N(data)))
console.log('part 2 is ... ', ((s,p,q)=>(J(q.values(),(1E9-s)%p+s)))(...Z(data,new Map(),0)))
console.log((performance.now()-t)+' ms')



// C=m=>P(L,E,L,E,L,E,L,E)(m)

// WOO!

// Part 1 107053
// Part 2 88371


// H=r=>r.split('').reduce((a,v,i)=>v=='O'?a+','+i:a,'')
// H=r=>r.split('').reduce((a,v,k)=>v=='O'? a + BigInt(3)**BigInt(k): a, 0n)
// C=m=>P(L,E,L,E,L,E,L,E)(m)