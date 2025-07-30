import * as THREE from 'three'
import App from "../App";
import fragmentShader from '../Shaders/HyperDrive/fragment.glsl'
import vertexShader from '../Shaders/HyperDrive/vertex.glsl'


export default class HyperDrive{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.setInstance()
    }

    setInstance(){
        let geometry = new THREE.CylinderGeometry( 5, 5, 20, 32, 1, true ); 
        let material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            wireframe: true
        }); 
        
        
        this.instance = new THREE.Mesh( geometry, material ); 
        
        this.instance.scale.set(2, 2, 2)
        this.scene.add( this.instance )
    }
}