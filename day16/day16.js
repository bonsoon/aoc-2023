// Day 16
// Laser bean starts top left going right
stream = document.body.innerText

G = s =>(g=s.replaceAll('\r', '').split('\n'),g.w =g[0].length,g.h=g.length,g)
A = (p,q) => p.map((t,i)=>t+q[i])
D = n => [[-1,0],[1,0],[0,-1],[0,1]][n]
N = (c,d) =>c == '/'? [[3],[2],[1],[0]][d]:
            c == '\\'? [[2],[3],[0],[1]][d]:
            c == '|'? [[d],[d],[0,1],[0,1]][d]:
            c == '-'? [[2,3],[2,3],[d],[d]][d]: [d]

B = (p,d,g,m=new Map())=>{
    if (m.has(p+'') && m.get(p+'').includes(d) ) { return }
    else( m.has(p+'')?  m.get(p+'').push(d):m.set(p+'',[d]))
    let [nr,nc] = A(p,D(d))
    if (nr < 0 || nr >= g.h || nc < 0 || nc >= g.w){return}
    for(let t of N(g[nr][nc],d)){B([nr,nc],t,g,m)}
    return m.size - 1}

P1= (s) => console.log('part 1 ... ', B([0,-1],3,G(s)))
P2 = (s)=>{
max = 0
g = G(s)
for(let r = 0 ; r < g.h; r++){
    max = Math.max(B([r,-1],3,g), max)
}
for(let r = 0 ; r < g.h; r++){
    max = Math.max(B([r,g.w],2,g), max)
}
for(let c = 0 ; c < g.w; c++){
    max = Math.max(B([-1,c],1,g), max)
}
for(let c = 0 ; c < g.w; c++){
    max = Math.max(B([g.h,c],0,g), max)
}
console.log('part 2 ... ', max)
}

t = performance.now()
P1(stream)
P2(stream)
console.log((performance.now() -t)/1000,' seconds' )