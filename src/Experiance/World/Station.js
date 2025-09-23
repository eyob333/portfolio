import * as THREE  from 'three'
import App from "../App";



export default class Station{
    
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time

        this.resource = this.resources.item.Station
        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Station')
            .close()
        }
        this.setInstance()

        if ( this.debug.active){
            let stationPosition = this.debugFolder.addFolder('station-position')
            let stationRoation = this.debugFolder.addFolder('station-rotation')

            stationPosition.add( this.instance.position, 'x').name("x").step(0.001).max(10).min(-10)
            stationPosition.add( this.instance.position, 'y').name("y").step(0.001).max(10).min(-10)
            stationPosition.add( this.instance.position, 'z').name("z").step(0.001).max(10).min(-10)

            stationRoation.add( this.instance.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            stationRoation.add( this.instance.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            stationRoation.add( this.instance.rotation, 'z').name("z").step(0.001).max(10).min(-10)
            
        }

    }


    setInstance(){
        this.instance = this.resource.scene
        this.instance.scale.set( 2., 2., 2.)
        // this.model.rotation.set(0, Math.PI, 0,)
        this.instance.traverse( child =>{
            if ( child instanceof THREE.Mesh){
                child.castShadow = false
                child.material.side = THREE.FrontSide
            }
        })
        this.scene.add( this.instance )
    }    

    update(){
        // this.animation.mixer.update( this.time.delta * 0.00002 )
    }
}