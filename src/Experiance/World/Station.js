import * as THREE  from 'three'
import plumeVet from '../Shaders/Plume/vertex.glsl'
import plumeFrag from '../Shaders/Plume/fragment.glsl'
7
import App from "../App";
import { depth } from 'three/tsl';



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
        this.instance.scale.set( .1 * 10, .1 * 10 , .1 * 10)
        // this.model.rotation.set(0, Math.PI, 0,)

        this.uniforms = {}
        this.uniforms.uTime = new THREE.Uniform(0)
        this.uniforms.uSpeed = new THREE.Uniform(0.1)

        const plumeOuterMat = new THREE.ShaderMaterial({
            transparent: true,
            fragmentShader: plumeFrag,
            vertexShader: plumeVet,
            uniforms: this.uniforms,
            side: THREE.DoubleSide,
            depthWrite: false,
            // wireframe: true
        })

        this.instance.traverse( child =>{
            if ( child instanceof THREE.Mesh){
                child.castShadow = false
                child.material.side = THREE.FrontSide
            }
        })
        console.log(this.instance.children)
        let plume = this.instance.children.find( child => child.name === 'plume_outer' )
        plume.material = plumeOuterMat
        console.log(plume)
        
        
        this.instance.position.set(0, 1, -1)
        this.scene.add( this.instance )
        this.app.camera.instance.position.set(-91.90,-44.72,-102.01)
        this.app.camera.controls.target.set(-74.31,-36.49,-38.18)
    }    

    update(){
        this.uniforms.uTime.value = this.app.time.elapsed 
    }

}