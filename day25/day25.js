    fs = require('fs')
    print = console.log
    stream = fs.readFileSync('test.txt', 'utf8')
    data = stream.replace(/\r/,'')

    bound = 26987.89
    vertices = (data.match(/middle(.*?)font/g))
    count = 0
    num_vertices = 0 
    for(let line of vertices){
        num_vertices++
        if((parseFloat(line.split("x=\"")[1].split("\" y=")[0])) <= 26987.89){
            count++
        }
    }
    print(count * (num_vertices - count))