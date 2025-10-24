import * as THREE  from 'three'
import App from "../App";
import planetVertex from '../Shaders/Planet/vertex.glsl'
import planetFragment from '../Shaders/Planet/fragment.glsl'


export default class Planet{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene

        this.albedo = this.app.resources.item.PlanetAlbedo
        this.displacement = this.app.resources.item.PlanetDisplacement
        this.albedoN = this.app.resources.item.PlanetAlbedoNight
        this.specular = this.app.resources.item.PlanetSpecular
        this.albedo.colorSpace = THREE.SRGBColorSpace
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
            this.debugFolder.add( this.material.uniforms.uDirectionalIntensity, 'value').min(0).max(1).step(.001).name('directional-intensity')
            // this.debugFolder.add( this.material.uniforms.u)
        }

    }
uAmbientColor
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
                uAlbedoNight: new THREE.Uniform(this.albedoN),
                uSpecular: new THREE.Uniform(this.specular),
                uDisplacement: new THREE.Uniform(this.displacement),
                uDirectionalIntensity: new THREE.Uniform(.04),
                uDirectionalColor: new THREE.Uniform( new THREE.Color(this.params.directionalColor)),
                uLightDirection: new THREE.Uniform( new THREE.Vector3(.0, .0, .3)),
                uAmbientIntesity: new THREE.Uniform(.3),
                uAmbientColor: new THREE.Uniform(new THREE.Color(this.params.ambientColor)),
            }
        })
        const earthGeometry = new THREE.SphereGeometry(2, 64, 64)
        this.instance = new THREE.Mesh(earthGeometry, this.material)
        this.instance.scale.set(this.params.scaleF, this.params.scaleF, this.params.scaleF)
        // this.instance.frustumCulled = false
        this.instance.position.set(-40, -19, -20)
        this.app.camera.controls.target.copy(this.instance.position)
        this.scene.add( this.instance )
    }  
    
    update(){
        this.instance.rotation.y += this.app.time.delta * .0001
    }
   
}


