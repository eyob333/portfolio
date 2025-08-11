import * as THREE from 'three'
import App from "../App";
import fragmentShader from '../Shaders/HyperDrive/fragment.glsl'
import vertexShader from '../Shaders/HyperDrive/vertex.glsl'


export default class HyperDrive{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resource = this.app.resources
        this.degug = this.app.debug
        this.setInstance()

        if (this.degug.active){
            this.setDebug()
        }
    }

    setInstance(){
        this.geometry = new THREE.CylinderGeometry( 5, 5, 40, 34, 1, true ); 
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: new THREE.Uniform(0),
                uTexture: new THREE.Uniform(this.resource.item.Streak),
                uSpeed: new THREE.Uniform(1)
            },
            side: THREE.BackSide,
            transparent: true,
            wireframe: false,
        }); 
        
        this.instance = new THREE.Mesh( this.geometry, this.material ); 
        this.instance.scale.set(2, 2, 2)
        this.scene.add( this.instance )
    }
    setDebug(){
        let driveDebug = this.degug.ui.addFolder("Hyper Drive")
            .close();
        driveDebug.add(this.material, 'wireframe').name('wireframe')
        driveDebug.add(this.material, 'transparent').name('transparent')
        let dirveUniforms = driveDebug.addFolder("uniforms")
        dirveUniforms.add(this.material.uniforms.uSpeed, 'value').min(0).max(3).step(0.0001).name('uTime')
    }
    update(){
        this.material.uniforms.uTime.value = this.app.time.elapsed
    }
}