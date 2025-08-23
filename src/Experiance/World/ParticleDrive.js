import * as THREE from 'three'
import App from "../App";
import fragmentShader from '../Shaders/Particle/fragment.glsl'
import vertexShader from '../Shaders/Particle/vertex.glsl'

export default class ParticleDrive{
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

    SetParams(){
        this.params = {}
        this.params.count = 1000
        
        this.uniforms = {}
        this.uniforms.uTime = new THREE.Uniform(0)
        this.uniforms.uSpeed =  new THREE.Uniform(1)
        this.uniforms.uSize = new THREE.Uniform(1.)
        this.uniforms.uResolution = new THREE.Uniform( new THREE.Vector2(this.app.sizes.width, this.app.sizes.height))
    }
    setInstance(){

        this.SetParams();
        
        this.geometry = new THREE.BufferGeometry(); 
        const position = new Float32Array( this.params.count * 3);

        for( let i = 0; i < this.params.count; i++ ){
            let i3 = i * 3;
            position[ i3 + 0] = (Math.random() - .5) * 2;
            position[ i3 + 1] = (Math.random() - .5) * 2;
            position[ i3 + 2] = (Math.random() - .5) * 2;
        }   
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute(position, 3))

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            transparent: true,
            wireframe: false,
            // side: THREE.BackSide,
            // blending: THREE.AdditiveBlending,
            // depthWrite: false
        }); 
        
        this.instance = new THREE.Points( this.geometry, this.material ); 
    
        this.scene.add( this.instance )
    }

    setDebug(){
        let particle = this.degug.ui.addFolder("Particle Drive")
            // .close();
        particle.add(this.params,  'count').min(10).max(100000).step(1).name('count')
        particle.add(this.uniforms.uSpeed, 'value').min(0).max(3).step(0.0001).name('uTime')
        particle.add(this.uniforms.uSize, 'value').min(0).max(40).step(0.0001).name('uSize')
        particle.add(this.material, 'wireframe').name('wireframe')
        particle.add(this.material, 'transparent').name('transparent')

        // particle.addColor(this.degugObj, 'color').onChange( () =>{
        //     this.outerMaterial.uniforms.uColor = new THREE.Uniform(new THREE.Color(this.degugObj.color))
        // })  
        
    }
    update(){
        this.material.uniforms.uTime.value = this.app.time.elapsed
    }
}