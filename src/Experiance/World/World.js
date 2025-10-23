import * as THREE from 'three'
import App from "../App"
import Ship from './Ship'
import Nomad from './Nomad'
import Enviromet from './Environment'
import Station from './Station'
import Planet from './Planet'


export default class World{

    constructor(){
        this.experiance = new App()
        this.scene = this.experiance.scene
        this.resorces = this.experiance.resources


        this.resorces.on( 'ready', ()=>{ 
            // this.Nomad = new Nomad()          
            // this.Ship = new Ship()
            // this.Station = new Station()
            this.Planet = new Planet()
            this.Enviromet = new Enviromet()
            
        })

    }

    update(){
        // if( this.Star){
        //     this.Star.update()
        // }        
        if(this.Particle){
            this.Particle.update()
        }
        if (this.Enviromet){
            this.Enviromet.update()
        }
        if(this.Hangar && this.Hangar.cssRenderer && this.Hangar.screen ){
            this.Hangar.update()
            
        }

    }
}