import * as THREE from 'three'
import EventEmitter from "./EventEmitter"

export default class RayCaster extends EventEmitter{
    constructor(){
        super()
        console.log("yyy")
        window.addEventListener("click", e =>{
            console.log(e)
            this.trigger("Click")
        })

    }
}