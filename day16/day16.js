// Day 16
// 

stream = document.body.innerText

G = s => (g=s.replaceAll(/\r|\n$/g, '').split('\n'), g.w=g[0].length, g.h=g.length, g)
A = (p,q) => p.map((t,i)=>t+q[i])
D = n => [[-1,0],[1,0],[0,-1],[0,1]][n]
N = (c,d) => c == '/'? [[3],[2],[1],[0]][d]:
             c == '\\'? [[2],[3],[0],[1]][d]:
             c == '|'? [[d],[d],[0,1],[0,1]][d]:
             c == '-'? [[2,3],[2,3],[d],[d]][d]:[d]

B = (p,d,g,m=new Map())=>{
    if (m.has(p+'') && m.get(p+'').includes(d) ) { return }
    else( m.has(p+'')? m.get(p+'').push(d):m.set(p+'',[d]))
    let [nr,nc] = A(p,D(d))
    if (nr < 0 || nr >= g.h || nc < 0 || nc >= g.w){ return }
    for(let z of N(g[nr][nc],d)){B([nr,nc],z,g,m)}
    return m.size - 1}

P1 = (g) => console.log('part 1 ... ', B([0,-1],3,g))
P2 = (g) => {let [x,y,dx,dy,r,max,d,i,_] = [-1,-1,1,0,[3,0,2,1].values(),0]
        for( d = r.next().value, s = 0; s < 4; _=dx, dx=-dy, dy=_, s++){
            for ( i=1; i<= g.w; x+=dx, y+=dy, i++) {
                B([x,y],d,g) > max ? max=B([x,y],d,g):null}}
        console.log('part 2 ... ', max)}

t = performance.now();
(g = G(stream),P1(g),P2(g))
console.log((performance.now() -t)/1000 + ' seconds' )