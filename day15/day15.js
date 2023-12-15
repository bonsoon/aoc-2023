// fs = require('fs')
// print = console.log
// stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')

// Day 15 : Lens Library
// A = Hash function on string to a number in 0 to 255
// P1 = Part 1 solution function, takes input data
// B = Install the lenses, takes input data m, and empty box 
//    collection b, and return a collection of lens-populated boxes
// P2 = Part 2 solution function P2, takes input data

// Copy/paste below and run directly in console of puzzle input
// https://adventofcode.com/2023/day/15
// https://adventofcode.com/2023/day/15/input

                      stream = 
             document         .body
         .innerText                 ;
     data =stream                    .
   replace('\r|\n'
  ,'').split ( ','                   );
  A = w=>w.split(                    '').
 reduce(( a,v ) =>                  ((a+v.
 charCodeAt())*17)%               256,0);P1
 =m => m.reduce((a,v)           =>a+A(v),0);
 B = m => (b = new Map () ,m.map(x=>x. split
 (/-|=/)).forEach(e =>(f=e[1])==''?(b.get(A
 (l=e[0]))?.delete(l)):b.has(n=A(l=e[0]))?b
 .get(n).set(l,f):b.set(n,new Map([e]))),b)
  ;P2 = m => [...B(m).entries()].reduce((a
   ,b)=>a+[...b[1].entries()].reduce((c,l
     ,p)=>c+(b[0]+1)*(p+1)*(0+l[1]),0 ),
      0);console.log('Part 1 is ... ' ,
        P1(data),'\nPart 2 is ... ',
           P2(data)); //AOC 2023
               // DAY 15, by B