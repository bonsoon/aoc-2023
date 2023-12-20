fs = require('fs')
print = console.log
stream = fs.readFileSync('input', 'utf8')
// stream = fs.readFileSync('sample', 'utf8')
// stream = fs.readFileSync('sample2', 'utf8')

// -- Day 20 Pulse Propagation

// Each pulse is eigher high or low
// flip-flop: %- either on or off, toggled by low pulse
//             if off, turns on and sends high pulse
//             if on , turns off and sends low pulse
// conjunction: &- remembers the type of the most recent pulse receieved
//               from each of the connected modules 
//              initially: remembering a low pulse for each input
//               When a pulse is received, the conjunction module first updates
//               its memory for that input. Then, if it remembers high pulses for
//               all inputs, it sends a low pulse; otherwise, it sends a high pulse.
// broadcast module (named broadcaster). When it receives a pulse,
//               it sends the same pulse to all of its destination modules.
// button module. When you push the button, a single low pulse is sent directly to the broadcaster module.
// 

class Module {
    constructor(name,connections){
        this.name = name
        this.connections = connections
    }
    send_signal(level){
        // sends the level (high 1 /low 0) pulse to each of its connections
        // print('sending',level)
        // print(this.name, ' sending...', level)
        for(let cnx of this.connections){
            if(moduleCollection[cnx]){
                pulseCounter[level]++
            // moduleCollection[cnx].received = level // bad, move it 
            // moduleCollection[cnx].process(level, this.name)}
            processQueue.push([this.name,level, cnx])
            // print([this.name,level, cnx])
        }
    }
    // process(level,from){
    //     processQueue.push([from, level, moduleCollection[this.name]])
    }
    perform(){

    }
}

class Flippy extends Module{
    constructor(name,connections){
        super(name,connections)
        this.state = false
        this.received
    }

    perform(fr,lv){
        if(this.received==1){
            // do nothing
        }
        
        if(lv==0)
        {
            if(this.state){
                this.state = !this.state
                this.send_signal(0)
            }else{
                this.state = !this.state
                this.send_signal(1)
            }
        }
    }
}

class Amppy extends Module{
    constructor(name,connections){
        super(name,connections)
        this.state = {}
        this.received
    }
    perform(fr,lv,step){
        this.state[fr]=lv
        // print('amppy state!!!!',this.state)
        // print('ammpy state...', Object.values(this.state))
        if(Object.values(this.state).every((x)=>x==1)){
            this.send_signal(0)
        }else{
            this.send_signal(1)
            if(this.name == 'bb'){
                print(this.name, 'sending', step)
            }
        }
        
    }
}

class Button extends Module{
    constructor(name,connections){
        super(name,connections)
    }
}

class Broadcaster extends Module{
    constructor(name,connections){
        super(name,connections)
    }
}
// console.log('C:\\Users\\bonso\\OneDrive\\Desktop\\ADVENT\\2023\\day20\\main.js:100')

moduleCollection = {}


pulseCounter = [0,0]

moduleCollection['button'] = new Button('button', ['broadcaster'])
data = stream.replace(/\r| /g,'').split('\n')
for(let line of data){
    let [x,y] = line.split('->')
    if(x.includes('%')){moduleCollection[x.slice(1)] = new Flippy(x.slice(1),y.split(','))}
    if(x.includes('&')){moduleCollection[x.slice(1)] = new Amppy(x.slice(1),y.split(','))}
    if(x.includes('broad')){moduleCollection[x] = new Broadcaster(x,y.split(','))}
}

for(let mod of Object.values(moduleCollection)){
    for(let cnx of mod.connections){
        if(moduleCollection[cnx]?.constructor.name == 'Amppy'){
            moduleCollection[cnx].state[mod.name] = 0
        }
        if(!(cnx in moduleCollection)){
            moduleCollection[cnx] = new Module(cnx,[])
        }
    }
}


function part(){
processQueue = []
positionInQueue = 0

// print(moduleCollection)
// print(processQueue)
loop:for(let i = 0 ; i < 100000000 ; i++){

    processQueue = []
positionInQueue = 0
moduleCollection.broadcaster.send_signal(0)
pulseCounter[0]++


while(positionInQueue<processQueue.length){
    // print(processQueue,positionInQueue)
    let [fr, lv, mod] = processQueue[positionInQueue]
    if(lv == 0 && mod =='rx'){
        print(i+1)
        print('ahahahahah')
        break loop
    }
    // if(mod=='qd'){
    //     print(mod, ' sending ' , lv, ' at btn press ', i+1)
    // }
    // print(fr , lv , mod, moduleCollection[mod].state)
    moduleCollection[mod].perform(fr,lv,i+1)
    positionInQueue++
    // print(processQueue)
}
// print(tobin(moduleCollection['gr'].state))

}

print(done)
// print(pulseCounter)
// print(pulseCounter.reduce((a,x)=>a*x,1))
}
// 704210523 TOO LOW

part()

function tobin(obj){
    return parseInt(Object.values(obj).join(''),2)
}
