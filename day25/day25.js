// [Language: Javascript] and Graphviz

// (A cursed method that I employed...) First use Graphviz to generate the graph in SVG, and as many people remarked the graph is jumbled although you can see the three lines connecting and where to "cut", for me I have a cluster on the left and one on the right. On my input, I can see the "right most" node name visually for the left component, say it is "xxx". 

// Now SVG really is a xml text file. So you can open it up and find said node "xxx". The coordinates of this node in the svg file is given as 

//     <title>xxx</title>
//     <ellipse ....
//     <text text-anchor="middle" x="26987.89" y="-588.58" font-family= ....

// So now I know all the nodes with x-coordinate <= 26987.89 is going to be in one component. So then I just parse the svg file (first save separate as a text file due to some weird encoding), and regex `/middle(.*?)font/g` to extract the relevant x coordinate info.

//     fs = require('fs')
//     print = console.log
//     stream = fs.readFileSync('test.txt', 'utf8')
//     data = stream.replace(/\r/,'')

//     bound = 26987.89
//     vertices = (data.match(/middle(.*?)font/g))
//     count = 0
//     for(let line of vertices){
//         if((parseFloat(line.split("x=\"")[1].split("\" y=")[0])) <= 26987.89){
//             count++
//         }
//     }
//     print(count)

// Now if you should also tally up how many total nodes. Subtracting and multiplying gives final answer. Awesome puzzle!