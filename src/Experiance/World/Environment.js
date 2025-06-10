import * as THREE from 'three'
import App from "../App";


export default class Enviromet{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.debug = this.app.debug


        this.setSunLight()

        if( this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Enviromet')
                .close();

            this.debugFolder.add( this.sunLight, 'intensity' ).name('lightIntensity').min(0).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'x' ).name('lightPositionX').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'y' ).name('lightPositionY').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'z' ).name('lightPositionZ').min(-10).max(10).step( 0.001)

        }

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set( 1024 , 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set( 3.5, 2, -1.25)
        this.scene.add( this.sunLight )
    }
    

}