import * as THREE from 'three'

import App from "../App"
import Ship from './Ship'
import Nomad from './Nomad'
import Enviromet from './Environment'
import Station from './Station'
import Star from './Star'
import ParticleDrive from './ParticleDrive'
import Cockpit from './Cockpit'
import Hangar from './Hangar'


export default class World{

    constructor(){
        this.experiance = new App()
        this.scene = this.experiance.scene
        this.resorces = this.experiance.resources

        // test mesh 
        // const testMesh = new THREE.Mesh( 
        //     new THREE.BoxGeometry(),
        //     new THREE.MeshStandardMaterial({color: '#ffffff',})
        // )
        // this.scene.add( testMesh )
        
        this.resorces.on( 'ready', ()=>{ 
            this.Nomad = new Nomad()          
            this.Ship = new Ship()
            this.Station = new Station()
            // this.Star = new Star()
            this.Particle = new ParticleDrive()
            this.Cockpit = new Cockpit()
            this.Hangar = new Hangar()
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

    }
}