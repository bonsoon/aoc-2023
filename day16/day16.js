// Day 16
// Copy / paste and run directly in browser console of puzzle input page
// https://adventofcode.com/2023/day/16/input

stream = document.body.innerText

G = s => (g=s.replaceAll(/\r|\n$/g, '').split('\n'), g.w=g[0].length, g.h=g.length, g)
D = n => [[-1,0],[1,0],[0,-1],[0,1]][n]
N = (c,d) => c == '/'? [[3],[2],[1],[0]][d]: c == '\\'? [[2],[3],[0],[1]][d]:
            c == '|'? [[d],[d],[0,1],[0,1]][d]: c == '-'? [[2,3],[2,3],[d],[d]][d]:[d]
B = (p,d,g,m=new Map(),ini=1)=>{
    if (m.get(p+'')?.includes(d)) { return }
    else( m.has(p+'')? m.get(p+'').push(d):m.set(p+'',[d]))
    let ed = D(d), [nr,nc] = [p[0]+ed[0],p[1]+ed[1]]
    if (nr < 0 || nr >= g.h || nc < 0 || nc >= g.w){ return }
    for(let z of N(g[nr][nc],d)){B([nr,nc],z,g,m,0)}
    return ini? (m.size-1):null }
P1 = g => console.log('part 1 ... ', B([0,-1],3,g))
P2 = g => {
    let [x,y,dx,dy,max,r] = [-1,-1,1,0,0,[3,0,2,1].values()]
    for(s = 0; s < 4; [dy,dx]=[dx,-dy], s++){d=r.next().value
        for (i = 0; i < (dy&1)*(g.w+1)+(dx&1)*(g.h+1) ; x+=dx, y+=dy, i++) { 
          max = Math.max(max,B([x,y],d,g)||0)}}
    console.log('part 2 ... ', max)}

t = performance.now(); g = G(stream); P1(g) ; P2(g)
console.log((performance.now() -t)/1000 + ' seconds' )

// G = parses the input data, and appends grid width and height ; 
// D = encodes directions with 0,1,2,3 ; 
// N = the workhorse that finds the new direction, given future grid
//     type and current direction ; 
// B = advances the beam and applies DFS if splits ; 
// P1 and P2 are solution functions.