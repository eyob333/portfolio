import * as THREE  from 'three'
import plumeVert from '../Shaders/Ship/Plume/vertex.glsl'
import plumeFrag from '../Shaders/Ship/Plume/fragment.glsl'

import App from "../App";

export default class Ship{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time

        this.resource = this.resources.item.Ship
        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Ship')
            .close()
        }
        this.setInstance()

        if ( this.debug.active){
            let shipPosition = this.debugFolder.addFolder('ship-position')
            let shipRoation = this.debugFolder.addFolder('ship-rotation')

            shipPosition.add( this.instance.position, 'x').name("x").step(0.001).max(10).min(-10)
            shipPosition.add( this.instance.position, 'y').name("y").step(0.001).max(10).min(-10)
            shipPosition.add( this.instance.position, 'z').name("z").step(0.001).max(10).min(-10)

            shipRoation.add( this.instance.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            shipRoation.add( this.instance.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            shipRoation.add( this.instance.rotation, 'z').name("z").step(0.001).max(10).min(-10)
            
        }

    }

    setInstance(){
        this.instance = this.resource.scene
        console.log(this.instance)
        this.instance.scale.set( 1., 1., 1.)
        this.instance.rotation.set(0, Math.PI, 0,)
        // this.model.traverse( child =>{
        //     if ( child instanceof THREE.Mesh){
        //         child.castShadow = false
        //     }
        // })
        console.log(this.instance)
        this.scene.add( this.instance )
    }    
   

    update(){
        // this.animation.mixer.update( this.time.delta * 0.00002 )
    }
}