import * as THREE  from 'three'
import App from "../App";
import planetVertex from '../Shaders/Planet/vertex.glsl'
import planetFragment from '../Shaders/Planet/fragment.glsl'
import atmospehereVertex from '../Shaders/Atomsphere/vertex.glsl'
import atmospehereFragment from '../Shaders/Atomsphere/Fragment.glsl'



export default class Planet{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene

        this.albedo = this.app.resources.item.PlanetAlbedo
        this.normal = this.app.resources.item.PlanetNormal
        this.ao = this.app.resources.item.PlanetAo
        this.roughness = this.app.resources.item.PlanetRoughness
        this.cloud = this.app.resources.item.PlanetCloud

        this.albedo.colorSpace = THREE.SRGBColorSpace
        this.albedo.wrapS = this.albedo.wrapT = THREE.RepeatWrapping
        this.normal.wrapS = this.normal.wrapT = THREE.RepeatWrapping
        this.roughness.wrapS = this.roughness.wrapT = THREE.RepeatWrapping
        this.normal.wrapS = this.normal.wrapT = THREE.RepeatWrapping
        this.ao.wrapS = this.ao.wrapT = THREE.RepeatWrapping

        this.normal.encoding = THREE.LinearEncoding;
        this.roughness.encoding = THREE.LinearEncoding;
        this.ao.encoding = THREE.LinearEncoding
        this.cloud.LinearEncoding = THREE.LinearEncoding





        

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
            planetScale.add( this.params, 'scaleF').name("params.scaleF").step(0.00001).max(40).min(0)
                .onChange( () => {
                    this.instance.scale.set(this.params.scaleF, this.params.scaleF, this.params.scaleF)
                })
            this.debugFolder.addColor( this.params, 'ambientColor').onChange( ()=>{
                this.material.uniforms.uAmbientColor.value.set(this.params.ambientColor)
            })
            this.debugFolder.addColor( this.params, 'directionalColor').onChange( () =>{
                this.material.uniforms.uDirectionalColor.value.set(this.params.directionalColor)}
            )
            this.debugFolder.add( this.material.uniforms.uAmbientIntesity, 'value').min(0).max(1).step(.001).name('ambeint-intensity')
            this.debugFolder.add( this.material.uniforms.uDirectionalIntensity, 'value').min(0).max(3).step(.001).name('directional-intensity')
            // this.debugFolder.add( this.material.uniforms.u)
        }

    }
    setInstance(){
        this.params = {}
        this.params.ambientColor = '#ffffff'
        this.params.directionalColor = '#ffffff'
        this.params.scaleF = 15
        this.material = new THREE.ShaderMaterial({ 
            vertexShader: planetVertex,
            fragmentShader: planetFragment,
            uniforms: {
                uAlbedo: new THREE.Uniform(this.albedo),
                uRoughness: new THREE.Uniform(this.roughness),
                uCloud: new THREE.Uniform(this.cloud),
                uNormal: new THREE.Uniform(this.normal),
                uAo: new THREE.Uniform(this.ao),
                uDirectionalIntensity: new THREE.Uniform(.7),
                uDirectionalColor: new THREE.Uniform( new THREE.Color(this.params.directionalColor)),
                uLightDirection: new THREE.Uniform( new THREE.Vector3(.0, .0, .3)),
                uAmbientIntesity: new THREE.Uniform(.29),
                uAmbientColor: new THREE.Uniform(new THREE.Color(this.params.ambientColor)),
            }
        })
        this.atmosphereMaterial = new THREE.ShaderMaterial({
            side: THREE.BackSide
        })
        const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
        this.instance = new THREE.Mesh(earthGeometry, this.material)
        this.instance.scale.set(this.params.scaleF, this.params.scaleF, this.params.scaleF)
        // this.instance.frustumCulled = false
        this.instance.position.set(-40, -19, -20)
        this.app.camera.controls.target.copy(this.instance.position)
        this.scene.add( this.instance )

        this.atmosphere = new THREE.Mesh(earthGeometry, this.atmosphereMaterial)
        this.atmosphere.position.copy(this.instance.position)
        this.atmosphere.scale.set(this.params.scaleF * 1.04, this.params.scaleF * 1.04, this.params.scaleF * 1.04)
        this.scene.add(this.atmosphere)

        
    }  
    
    update(){
        this.instance.rotation.y += this.app.time.delta * .0001
    }
   
}


