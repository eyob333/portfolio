import * as THREE from 'three'

import App from "../App"
import Ship from './Ship'
import Enviromet from './Environment'
import Nomad from './Nomad'
import HyperDrive from './HyperDrive'
import Star from './Star'



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
        // testMesh.castShadow  = true

        // this.scene.add( testMesh )
        
        this.resorces.on( 'ready', ()=>{ 
            // this.Nomad = new Nomad()           
            // this.Ship = new Ship()
            // this.Enviromet = new Enviromet()
            // this.HyperDirve = new HyperDrive()
            this.Star = new Star()
            
        })

    }

    update(){
        if ( this.Ship ){
            this.Ship.update()
        }
        if( this.HyperDirve){
            this.HyperDirve.update()
        }
    }
}