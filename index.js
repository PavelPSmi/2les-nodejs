import EventEmitter from 'events';

class TimerEmmitter extends EventEmitter {}
const emitter =new TimerEmmitter()

emitter.on('timerTick', ([dateInFuture, timer]) => {
    const dateNow =new Date();
    if (dateNow >= dateInFuture){
        emitter.emit('timerEnd', timer)
    }else{
        console.log(getPrettyTime((dateInFuture-dateNow)/1000),'left')
    }
})
emitter.on('timerEnd', timer =>{
    clearInterval(timer)
    console.log('End time')
})

const getPrettyTime = (seconds)=>{
    const arr = [
      Math.floor(seconds % 60),
      Math.floor((seconds / 60) % 60),
      Math.floor((seconds / (60 * 60)) % 24),
      Math.floor(seconds / (60*60*24)),
    ]
    return `${arr.pop()} d ${arr.pop()} h ${arr.pop()} min ${arr.pop()} sec`;
}

const start = (dateInFuture) =>{
    setInterval(function(){
        emitter.emit('timerTick', [dateInFuture, this])

    },1000)
}

for (const arg of process.argv.slice(2)) {
    const[hour, day, month, year]=arg.split('-')
    const dateInFuture=new Date(year, month -1, day, hour)
    if (isNaN(dateInFuture)) continue
    start(dateInFuture)
}