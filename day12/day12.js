fs = require('fs')
stream = fs.readFileSync('input', 'utf8')


stream = document.body.innerText
data = stream.replaceAll('\r', '').replace(/\n$/, "").split('\n')
print = console.log

checkstring = (t, qt) => {
    if (t.length != qt.length) { return false }
    for (let i = 0; i < t.length; i++) {
        if (qt[i] != '?' && qt[i] != t[i]) { return false }
    }
    return true
}

compute = (q, d) => {
    if (q.length == 0) { return 0 + (d.length == 0) }
    if (d.length == 0 && q.length > 0) { return 1 - q.includes('#') }
    let s = 0
    for (let i = 0; i <= q.length - d[0]; i++) {
        let w = '#'.repeat(d[0])
        if (d.length > 1) { w = w + '.' }
        if (checkstring(w, q.slice(i, i + w.length))) {
            s += compute(q.slice(i + w.length), d.slice(1))
        }
        if (q[i] == '#') { break }
    }
    return s
}

// A simple memoization wrapper

memo = f => {
    var cache = new Map()
    return function () {
        var key = JSON.stringify(arguments);
        if (cache.has(key)) { return cache.get(key) }
        else {
            val = f.apply(null, arguments)
            cache.set(key, val)
            return val
        }
    }
}

compute = memo(compute)

function main() {
    let p1 = 0
    let p2 = 0
    let tt = performance.now()
    for (let line of data) {
        let [q, d] = line.split(' ')
        d = d.split(',').map(u => parseInt(u))
        p1 += compute(q, d)
        p2 += compute(q + '?' + q + '?' + q + '?' + q + '?' + q, d.concat(d).concat(d).concat(d).concat(d))
    }
    console.clear()
    print('\u2744 ~ '.repeat(3), 'Day 12', '\u2744 ~ '.repeat(3))
    print('\x1b[33m~ part 1\x1b[0m is: ', p1)
    print('\x1b[33m~ part 2\x1b[0m is: ', p2)
    print('\u2744 ~ '.repeat(8))
    print('took', (performance.now() - tt) / 1000, 'seconds')
}

main()