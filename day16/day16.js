// --- Day 16: The Floor Will Be Lava ---
// Copy/paste below and run directly in console of puzzle input
// https://adventofcode.com/2023/day/16
// https://adventofcode.com/2023/day/16/input

stream = document.body.innerText

G = s => (g = s.replaceAll(/\r|\n$/g, '').split('\n'),w=g[0].length, h=g.length,
    g = g.map(x=>x.split('')).flat().map(c=>['.','/','\\','|','-'].indexOf(c)),
    g.w=w, g.h=h,g)
D = n => [[-1,0],[1,0],[0,-1],[0,1]][n]
N = (c,d) => c==0?[d]:c == 1? [[3],[2],[1],[0]][d]: c == 2? [[2],[3],[0],[1]][d]:
    c == 3? [[d],[d],[0,1],[0,1]][d]:[[2,3],[2,3],[d],[d]][d]
H = (p,w) => p[0] * w + p[1]
B = (p,d,g,m,ini=1)=>{
    if (m[H(p,g.w)]&(1<<d)) { return } else(ini?null:m[H(p,g.w)]+=(1<<d))
    let ed = D(d), [nr,nc] = [p[0]+ed[0],p[1]+ed[1]]
    if (nr < 0 || nr >= g.h || nc < 0 || nc >= g.w){ return }
    for(let z of N(g[nr *g.w +nc],d)){B([nr,nc],z,g,m,0)}
    return ini? (m.reduce((a,v)=>a+(v!=0),0)) :null }
P1 = g => console.log('part 1 ... ', B([0,-1],3,g,Array(g.w *g.h).fill(0)))
P2 = g => { let [x,y,dx,dy,max,r] = [-1,-1,1,0,0,[3,0,2,1].values()]
    let hash = Array(g.w *g.h)
    for(s = 0; s < 4; [dy,dx]=[dx,-dy], s++){d=r.next().value
        for (i = 0; i < (dy&1)*(g.w+1)+(dx&1)*(g.h+1) ; x+=dx, y+=dy, i++) { 
            hash.fill(0)
            max = Math.max(max,B([x,y],d,g, hash )||0)}}
    console.log('part 2 ... ', max)}

t = performance.now(); g = G(stream); P1(g); P2(g)
console.log((performance.now() -t) + ' milliseconds' )

// G = parses the input data, and appends grid width and height ; 
// D = encodes directions with 0,1,2,3 ; 
// N = the workhorse that finds the new direction, given future grid
//     type and current direction ; 
// H = hashes position location
// B = advances the beam and applies DFS if splits ; 
// P1 and P2 are solution functions.