import * as THREE from 'three'
import App from "../App";
import fragmentShader from '../Shaders/HyperDrive/fragment.glsl'
import vertexShader from '../Shaders/HyperDrive/vertex.glsl'
import outerVert from '../Shaders/HyperOuter/vertex.glsl'
import outerFrag from '../Shaders/HyperOuter/fragment.glsl'




export default class HyperDrive{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resource = this.app.resources
        this.degug = this.app.debug

        console.log(this.app)
        this.setInstance()
        this.setOuterInstance()

        if (this.degug.active){
            this.setDebug()
        }
    }

    setInstance(){
        
        this.geometry = new THREE.CylinderGeometry( 5, 5, 30, 34, 1, true ); 
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
            // blending: THREE.AdditiveBlending,
            depthWrite: false
        }); 
        
        this.instance = new THREE.Mesh( this.geometry, this.material ); 
        this.instance.scale.set(2, 2, 2)
        this.scene.add( this.instance )
    }

    setOuterInstance(){
        this.degugObj = {}
        this.degugObj.color = '#3b6d5e'
        this.outerGeometry= new THREE.CylinderGeometry(6. ,  10.3 , 30, 34, 1, true)

        this.outerMaterial = new THREE.ShaderMaterial({
            vertexShader: outerVert,
            fragmentShader: outerFrag,
            uniforms: {
                uTime: new THREE.Uniform(0),
                uTexture: new THREE.Uniform(this.resource.item.Hyper),
                uSpeed: new THREE.Uniform(1),
                uResolution: new THREE.Uniform( new THREE.Vector3(this.app.sizes.width, this.app.sizes.height, 1)),
                uColor: new THREE.Uniform( new THREE.Color(this.degugObj.color))
            },
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            // wireframe: true,
        });

        this.outerInstace = new THREE.Mesh(this.outerGeometry, this.outerMaterial);
        this.outerInstace.scale.set(2, 2, 2)
        this.scene.add(this.outerInstace)

    }
    setDebug(){
        let driveDebug = this.degug.ui.addFolder("Hyper Drive")
            // .close();
        let innerDrive = driveDebug.addFolder('inner Drive')
            // .close();
        let outerDrive = driveDebug.addFolder('outer Drive')
            // .close();
            
        innerDrive.add(this.material.uniforms.uSpeed, 'value').min(0).max(3).step(0.0001).name('uTime')
        innerDrive.add(this.material, 'wireframe').name('wireframe')
        innerDrive.add(this.material, 'transparent').name('transparent')

        outerDrive.add(this.outerMaterial.uniforms.uSpeed, 'value').min(0).max(3).step(0.0001).name('uTime')
        outerDrive.add(this.outerMaterial, 'wireframe').name('wireframe')
        outerDrive.add(this.outerMaterial, 'transparent').name('transparent')
        outerDrive.addColor(this.degugObj, 'color').onChange( () =>{
            this.outerMaterial.uniforms.uColor = new THREE.Uniform(new THREE.Color(this.degugObj.color))
        })  
        
    }
    update(){
        this.material.uniforms.uTime.value = this.app.time.elapsed
        // this.outerInstace.rotation.y -= .01;
        this.outerMaterial.uniforms.uTime.value = this.app.time.elapsed
    }
}