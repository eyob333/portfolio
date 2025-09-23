import * as THREE from 'three';
import App from '../App';
import starVertex from '../Shaders/Star/vertex.glsl'
import starFragment from '../Shaders/Star/fragment.glsl'

export default class Star{
    constructor(){
        this.app = new App();
        this.scene = this.app.scene;
        this.resources = this.app.resources
        this.debug = this.app.debug
        this.setInstance()

        if( this.debug.active){
            this.setDebug()
        }

    }

    setInstance(){
        this.uniform={}
        this.uniform.uSize = new THREE.Uniform(1.),
        this.uniform.uTime = new THREE.Uniform(0);
        this.uniform.uSpeed = new THREE.Uniform(.002);
        this.uniform.uTexture = new THREE.Uniform(this.resources.item.Star)
     

        this.params = {}
        this.params.count = 100
        this.params.radius =  20.

        const positions = new Float32Array(this.params.count * 3)
        const scale = new Float32Array(this.params.count)
        this.setAttr = () => {
            for(let i = 0; i < this.params.count; i++){
            
                const i3 = i * 3

                // Position
                const radius = this.params.radius;
                positions[i3    ] = (Math.random() -.5) * radius
                positions[i3 + 1] = (Math.random()  -.5) * radius
                positions[i3 + 2] = (Math.random()  -.5) * radius

                // scales
                scale[i] = Math.random();

            }            
        }
        this.setAttr();
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute( 'aScale', new THREE.BufferAttribute( scale, 1))

        const material = new  THREE.ShaderMaterial({
            vertexShader: starVertex,
            fragmentShader: starFragment,
            uniforms: this.uniform,
            // depthWrite: THREE.AdditiveBlending,
            // color: '#ffffff',
            // depthWrite: false,
            // depthTest: false,
            transparent: true,
        });
        this.star = new THREE.Points(geometry, material)
        this.scene.add(this.star);
    }

    setDebug(){
        let points = this.debug.ui.addFolder('Stars')
        points.add(this.star.material.uniforms.uSize, 'value').min(0).max(4.).step(0.1).name('uSize')
         points.add(this.star.material.uniforms.uSpeed, 'value').min(0).max(10.).step(0.001).name('uTime')
        // points.add(this.params, 'count').min(0).max(40.).step(0.1).name('count').onFinishChange( () =>{
        // })

    }

    update(){
        this.star.material.uniforms.uTime.value = this.app.time.elapsed
    }
}