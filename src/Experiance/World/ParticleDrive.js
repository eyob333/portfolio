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
        this.params.innerVoidRad = .5;
        this.params.outerRad = 1.;
        this.params.color = '#619ae5'

        this.uniforms = {}
        this.uniforms.uTime = new THREE.Uniform(0)
        this.uniforms.uSpeed =  new THREE.Uniform(.1)
        this.uniforms.uSize = new THREE.Uniform(35.)
        this.uniforms.uResolution = new THREE.Uniform( new THREE.Vector2(this.app.sizes.width, this.app.sizes.height))
        this.uniforms.uColor = new THREE.Uniform( new THREE.Color(this.params.color))

    }
    setInstance(){

        this.SetParams();
        
        this.geometry = new THREE.BufferGeometry(); 

        const position = new Float32Array( this.params.count * 3);
        const speed = new Float32Array( this.params.count)

        this.setAttr = () => {
       
            for( let i = 0; i < this.params.count; i++ ){
                let i3 = i * 3;
                while(true){
                    position[ i3 + 0] = Math.random() * 2 - 1;
                    position[ i3 + 1] = Math.random() * 2 - 1;
                    position[ i3 + 2] = 0;

                    // let distance = Math.sqrt(position[ i3 + 0] * position[ i3 + 0] + position[ i3 + 1] * position[ i3 + 1] +  position[ i3 + 2] * position[ i3 + 2])

                    // Calculate the distance from the center (0, 0)
                    const distance = Math.sqrt(position[ i3 + 0] * position[ i3 + 0] + position[ i3 + 1] * position[ i3 + 1]);

                    // Check if the point is within the hollow disc
                    if (distance >= 0.3 && distance <= 1) {
                        break;
                    }
                }


                let factor = Math.abs(position[i3 + 0] * position[i3 + 0] + position[i3 + 1] * position[i3 + 1] );
                speed[i] = (factor * 3.);
            }   
        }

        this.setAttr();

        this.geometry.setAttribute( 'position', new THREE.BufferAttribute(position, 3))
        this.geometry.setAttribute( 'aSpeed', new THREE.BufferAttribute(speed, 1))

        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            transparent: true,
            wireframe: false,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: true,
            opacity: .5
        }); 
        
        this.instance = new THREE.Points( this.geometry, this.material); 
        this.scene.add( this.instance )
    }

    setDebug(){
        let particle = this.degug.ui.addFolder("Particle Drive")
            // .close();
        particle.add(this.params,  'count').min(10).max(100000).step(1).name('count').onFinishChange( () =>{
            this.setAttr()
        })
        particle.add(this.params, 'outerRad').min(0).max(1.).step(.001).name('outerRadius')
        particle.add(this.params, 'innerVoidRad').min(0).max(1.).step(.001).name('VoidRadius')
        particle.add(this.uniforms.uSpeed, 'value').min(0).max(3).step(0.0001).name('uSpeed')
        particle.add(this.uniforms.uSize, 'value').min(0).max(40).step(0.0001).name('uSize')       
        particle.addColor( this.params, 'color').onChange( () =>{
            this.uniforms.uColor.value.set(this.params.color)
        }).name('uColor')
        particle.add(this.material, 'wireframe').name('wireframe')
        particle.add(this.material, 'transparent').name('transparent')
 

        // particle.addColor(this.degugObj, 'color').onChange( () =>{
        //     this.outerMaterial.uniforms.uColor = new THREE.Uniform(new THREE.Color(this.degugObj.color))
        // })  
        
    }
    update(){
        this.uniforms.uTime.value = this.app.time.elapsed
    }
}