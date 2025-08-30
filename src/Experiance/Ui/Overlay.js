import * as THREE from 'three';

export default class Overlay {
    constructor(scene) {
        this.scene = scene
        this.setInstance();
    }
    setInstance(){
        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.material = new THREE.ShaderMaterial({
            uniforms: { uAlpha: { value: 1 } },
            vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
            fragmentShader: `uniform float uAlpha; void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, uAlpha); }`,
            transparent: true,
            // wireframe: true

        });
        this.overlay = new THREE.Mesh(this.geometry, this.material)
        this.overlay.name = 'overlay'
        this.scene.add(this.overlay)
    }
    destroy(){
        this.scene.remove(this.overlay)
        if (this.geometry){
            this.geometry.dispose()
        }
        this.overlay.material.dispose()
        this.material.dispose()
    }
}
