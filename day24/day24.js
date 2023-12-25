// --- Day 24: Never Tell Me The Odds ---

fs = require('fs')

stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')

tt = performance.now()
print = console.log

data = stream.replace(/\r/g, '')
    .split('\n')
    .map(u => u.split(/,|@/).map(x => parseInt(x)))

// print(data)

// part 1

function intersect(a, b) {
    let [ax, ay, az, avx, avy, avz] = a
    let [bx, by, bz, bvx, bvy, bvz] = b
    let tx = (ax - bx) / (bvx - avx)
    let ty = (ay - by) / (bvy - avy)
    print((bvx - avx) / (bvy - avy))
    print(tx, ty)
    return tx == ty
}

function det(a, b, c, d) {
    return a * d - b * c
}

function path_intersection(a, b) {
    let [ax, ay, az, avx, avy, avz] = a
    let [bx, by, bz, bvx, bvy, bvz] = b
    let d = det(avy, -avx, bvy, -bvx)
    if (d == 0) { return null }
    let x = det(avy * ax - avx * ay, -avx, bvy * bx - bvx * by, -bvx) / d
    let y = det(avy, avy * ax - avx * ay, bvy, bvy * bx - bvx * by) / d
    return [x, y]
}

function isfuture(a, p) {
    let [ax, ay, az, avx, avy, avz] = a
    let [px, py] = p
    return (px - ax)/avx > 0
}

// print(path_intersection(data[0], data[1]))

// print(isfuture(data[1], path_intersection(data[0], data[1])))
part1 = 0 
lower = 200000000000000
upper = 400000000000000
for(let i = 0 ; i < data.length; i++){
    for(let j = i+1; j< data.length; j++){
        let intersect = path_intersection(data[i], data[j])

        // print(i,j, intersect)
        if(intersect == null){continue}
        if(lower<= intersect[0] && intersect[0] <= upper
            &&lower<= intersect[1] && intersect[1] <= upper){
                if(isfuture(data[i],intersect) 
                    && isfuture(data[j],intersect)){
                    part1++
                }

            }

    }
}

print('Part 1 is ...', part1)

// part 2 ... we need to solve a system of nonlinear equations... 
// and z3 is magic.

const { init } = require('z3-solver');

async function line() {
    const { Context } = await init();
    const { Solver, Real } = new Context('main');
    const s = new Solver();
    const x = Real.const('x')
    const y = Real.const('y')
    const z = Real.const('z')
    const vx = Real.const('vx')
    const vy = Real.const('vy')
    const vz = Real.const('vz')
    const t = []
    for(let i = 0; i < data.length; i++){
        let [ax, ay, az, avx, avy, avz] = data[i]
        t.push(Real.const(`t${i}`))
        s.add((t[i].mul(vx).add(x).eq(t[i].mul(avx).add(ax))))
        s.add((t[i].mul(vy).add(y).eq(t[i].mul(avy).add(ay))))
        s.add((t[i].mul(vz).add(z).eq(t[i].mul(avz).add(az))))
    }
    await s.check()
    m = s.model()
    ans = m.eval(x.add(y).add(z)).value()
    part2 = Number(ans.numerator)/Number(ans.denominator)
    
}
line().then(() => (print('Part 2 is ...', part2), process.exit()))