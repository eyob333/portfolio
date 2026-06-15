import EventEmitter from "./EventEmitter";


export default class Hash extends EventEmitter{
    constructor(){
        

        window.addEventListener('hashchange', ()=> {
            console.log("hash change")
        })

        
    }
}