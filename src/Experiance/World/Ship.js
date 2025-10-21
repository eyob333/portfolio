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
        this.app.ship = this.resource.scene
        this.app.Dval = {x: 0, y: 1}
        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Ship')
            .close()
        }
        this.setInstance()

        if ( this.debug.active){
            let shipPosition = this.debugFolder.addFolder('ship-position')
            let shipRoation = this.debugFolder.addFolder('ship-rotation')
            let shipScale = this.debugFolder.addFolder("ship-Scale")

            shipPosition.add( this.instance.position, 'x').name("x").step(0.001).max(10).min(-10)
            shipPosition.add( this.instance.position, 'y').name("y").step(0.001).max(10).min(-10)
            shipPosition.add( this.instance.position, 'z').name("z").step(0.001).max(10).min(-10)

            shipRoation.add( this.instance.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            shipRoation.add( this.instance.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            shipRoation.add( this.instance.rotation, 'z').name("z").step(0.001).max(10).min(-10)
            shipScale.add( this.scaleFactor, 'value').name("scaleFactor").step(0.00001).max(10).min(0)
                .onChange( () => {
                    this.instance.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
                })
        }

    }

    setInstance(){
        this.scaleFactor = {}
        this.scaleFactor.value = .1
        this.instance = this.resource.scene
        this.instance.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
        this.instance.rotation.set(0, Math.PI, 0,)
        this.instance.traverse( child =>{
            if ( child instanceof THREE.Mesh){
                child.castShadow = false
                child.material.side = THREE.FrontSide
            }
        })
        // console.log(this.instance)
        this.instance.visible = false
        this.scene.add( this.instance )
    }    
   
}