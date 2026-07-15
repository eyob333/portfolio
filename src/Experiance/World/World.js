import * as THREE from 'three'
import App from "../App"
import Ship from './Ship'
import Enviromet from './Environment'



export default class World{

    constructor(){
        this.experiance = new App()
        this.scene = this.experiance.scene
        this.resorces = this.experiance.resources


        this.resorces.on( 'ready', ()=>{        
            this.Ship = new Ship()
            this.Enviromet = new Enviromet()
            
        })

    }

    update(){   
        if (this.Enviromet){
            this.Enviromet.update()
        }
        if(this.Planet){
            this.Planet.update()
        }
    }
}