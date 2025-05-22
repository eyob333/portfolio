import * as THREE from 'three'

class Lights{
    constructor(scene){
        this.scene = scene
        this.ambientLight = new THREE.AmbientLight('#ffffff', .5)
        this.directionalLight = new THREE.DirectionalLight('#ffffff', 5.) 
        this.init()  
    }

    init(){
        console.log("skd")
        this.directionalLight.position.set(0, 5, 2)
        this.scene.add(this.directionalLight)
        this.scene.add(this.ambientLight)
    }
}

export {Lights}