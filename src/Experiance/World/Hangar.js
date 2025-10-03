import * as THREE  from 'three'
import App from "../App";



export default class Hangar{
    
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time

        this.resource = this.resources.item.Hangar
        this.resourceT = this.resources.item.HangarT
        this.resourceT.flipY = false
        this.resourceT.colorSpace = THREE.SRGBColorSpace

        console.log(this.resourceT)

        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Hanger')
            .close()
        }
        this.setInstance()

        if ( this.debug.active){
            let stationPosition = this.debugFolder.addFolder('Hangar-position')
            let stationRoation = this.debugFolder.addFolder('Hangar-rotation')

            stationPosition.add( this.instance.position, 'x').name("x").step(0.001).max(10).min(-10)
            stationPosition.add( this.instance.position, 'y').name("y").step(0.001).max(10).min(-10)
            stationPosition.add( this.instance.position, 'z').name("z").step(0.001).max(10).min(-10)

            stationRoation.add( this.instance.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            stationRoation.add( this.instance.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            stationRoation.add( this.instance.rotation, 'z').name("z").step(0.001).max(10).min(-10)
        }

    }


    setInstance(){
        let material = new THREE.MeshBasicMaterial({map: this.resourceT})
        this.instance = this.resource.scene
        this.screen = this.instance.children[1]
        console.log(this.screen)
        this.instance.scale.set( .5, .5, .5)
        this.instance.traverse( child =>{ child.material = material })
        console.log(this.instance)
        // this.scene.add( this.instance )
    }   

}