                        stream = 
                document.body.innerText;
            data=stream.replaceAll('\r','').
         replace(/\n$/,"").split('\n\n').map(e=>
        e.split('\n'));D=(a,b)=>a.split('').map((_,
       k) => a[k] != b[k]).reduce((x, y) => x + y,0);
      T = m => m[0].split('').map((_, k) => (k =>m.map
     (u => u[k]).join(''))(k));H = (m, s) => { for (let
     k = 1; k < m.length; k++) { let l = k, u = m; if (k
     > m.length/2){u=u.slice(0).reverse();l=m.length -k}
      a= u.slice(0, l).join('' ) ; b = u.slice(l, 2 * l)
       .reverse().join('');if (s == D(a, b)){return k;}
        } return 0;};Day13 = stream =>[0, 1].map(s =>
           data.map(m => 100 * H(m, s) + H(T(m), s))
             .reduce((a, b)=>a +b,0));console.log
                 (Day13(stream))//AOC2023DAY13


// Copy/paste and run in browser console
// https://adventofcode.com/2023/day/13
// https://adventofcode.com/2023/day/13/input