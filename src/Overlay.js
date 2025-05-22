import * as THREE from 'three';

export class Overlay {
  constructor(scene) {
    const geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial({
      uniforms: { uAlpha: { value: 1 } },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `uniform float uAlpha; void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha); }`,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, this.material);
    scene.add(mesh);
  }
}
