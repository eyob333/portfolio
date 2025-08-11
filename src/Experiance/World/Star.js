import * as THREE from 'three';
import App from '../App';
import starVertex from '../Shaders/Star/vertex.glsl'
import starFragment from '../Shaders/Star/fragment.glsl'
import { TileShadowNode } from 'three/examples/jsm/tsl/shadows/TileShadowNode.js';


export default class Star{
    constructor(){
        this.app = new App();
        this.scene = this.app.scene;
        this.debug = this.app.debug
        this.setInstance()


        if( this.debug.active){
            this.setDebug
        }

    }

    setInstance(){
        this.uniform={}
        this.uniform.uSize = new THREE.Uniform(20. * this.app.sizes.pixelRatio),

        this.params = {}
        this.params.count = 1000
        this.params.radius =  10.;

        const positions = new Float32Array(this.params.count * 3)
        const scale = new Float32Array(this.params.count)

        for(let i = 0; i < this.params.count; i++){
        
            const i3 = i * 3

            // Position
            const radius = this.params.radius;
            positions[i3    ] = (Math.random()  -.5) * radius
            positions[i3 + 1] = (Math.random()  -.5) * radius
            positions[i3 + 2] = (Math.random()  -.5) * radius

            // scales
            scale[i] = Math.random();
            
            // // Color
            // const mixedColor = insideColor.clone()
            // mixedColor.lerp(outsideColor, radius / parameters.radius)

            // colors[i3] = mixedColor.r
            // colors[i3 + 1] = mixedColor.g
            // colors[i3 + 2] = mixedColor.b

        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute( 'aScale', new THREE.BufferAttribute( scale, 1))



        const material = new THREE.ShaderMaterial({
            vertexShader: starVertex,
            fragmentShader: starFragment,
            uniforms: this.uniform
        });

        this.star = new THREE.Points(geometry, material)
        this.scene.add(this.star);
    }

    setDebug(){
        let points = this.debug.ui.addFolder('stars')
        points.add(this.star.material.uniforms.uSize, 'value').min(0).max(10.).step(0.001).name('uSize')
    }
}