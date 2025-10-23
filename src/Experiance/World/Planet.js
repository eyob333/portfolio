import * as THREE  from 'three'
import App from "../App";

export default class Planet{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene

        this.planetT = this.app.resources.item.planetT
        this.planetT.colorSpace = THREE.SRGBColorSpace
        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('planet')
            .close()
        }
        this.setInstance()

        if ( this.debug.active){
            let planetPosition = this.debugFolder.addFolder('planet-position')
            let planetRoation = this.debugFolder.addFolder('planet-rotation')
            let planetScale = this.debugFolder.addFolder("planet-Scale")

            planetPosition.add( this.instance.position, 'x').name("x").step(0.001).max(40).min(-40)
            planetPosition.add( this.instance.position, 'y').name("y").step(0.001).max(40).min(-40)
            planetPosition.add( this.instance.position, 'z').name("z").step(0.001).max(40).min(-40)

            planetRoation.add( this.instance.rotation, 'x').name("x").step(0.001).max(40).min(-40)
            planetRoation.add( this.instance.rotation, 'y').name("y").step(0.001).max(40).min(-40)
            planetRoation.add( this.instance.rotation, 'z').name("z").step(0.001).max(40).min(-40)
            planetScale.add( this.scaleFactor, 'value').name("scaleFactor").step(0.00001).max(40).min(0)
                .onChange( () => {
                    this.instance.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
                })
        }

    }

    setInstance(){
        this.scaleFactor = {}
        this.scaleFactor.value = 15
        const material = new THREE.MeshStandardMaterial({ map: this.planetT})
        const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
        this.instance = new THREE.Mesh(earthGeometry, material)
        this.instance.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
        this.instance.frustumCulled = false
        this.instance.position.set(-40, -19, -20)
        this.scene.add( this.instance )
    }    
   
}


