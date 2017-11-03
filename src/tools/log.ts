class Log{
    constructor(){
        console.log('Logging to default console.');
    }
    send(...messages:any[]){
        console.log(...messages);
    }
}

//todo remove singleton use DI
export default new Log();