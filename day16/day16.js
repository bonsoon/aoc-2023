stream = document.body.innerText

G = s =>(g=s.replaceAll('\r', '').split('\n'),g.w =g[0].length,g.h=g.length,g)
A = (p,q) => p.map((t,i)=>t+q[i])
D = n => [[-1,0],[1,0],[0,-1],[0,1]][n]
N = (c,d) => 
c == '/'? [[3],[2],[1],[0]][d]:
c == '\\'? [[2],[3],[0],[1]][d]:
c == '|'? [[d],[d],[0,1],[0,1]][d]:
c == '-'? [[2,3],[2,3],[d],[d]][d]:[d]

beam = (p,d,g,m=new Map())=>{
    if (m.has(p+'') && m.get(p+'').includes(d) ) { return }
    else( m.has(p+'')?  m.get(p+'').push(d):m.set(p+'',[d]))

    let [nr,nc] = A(p,D(d))
    if (nr < 0 || nr >= g.h || nc < 0 || nc >= g.w){return}
    for(let t of N(g[nr][nc],d)){
     beam([nr,nc],t,g,m)}
    return m.size - 1
}

P1=(g)=>beam([0,-1],3,g)

P1(G(stream))