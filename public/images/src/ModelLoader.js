import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import testVertex from './shaders/includes/test/vertexShader.glsl';
import testFragment from './shaders/includes/test/fragmentShader.glsl';
import { getProject, types } from '@theatre/core';
import projectState from '/state.json'

export class ModelLoader {
  constructor(scene, manager) {
    this.scene = scene;
    this.mixer1 = null;
    this.mixer2 = null;
    this.ship1 = null;
    this.ship2 = null;

    this.material = new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      vertexShader: testVertex,
      fragmentShader: testFragment,
    });

    this.loader = new GLTFLoader(manager);
    this.load();
  }

  load() {
    this.loader.load('/models/free_m.glb', (gltf) => {
      this.ship1 = gltf.scene.children[0];
      // this.ship2 = gltf.scene.children[1];

      // this.ship1.traverse((child) => {
      //   if (child.isMesh) child.material = this.material;
      // });

      this.mixer1 = new THREE.AnimationMixer(this.ship1);
      // this.mixer2 = new THREE.AnimationMixer(this.ship2);

      // this.mixer1.clipAction(gltf.animations[0]).play();
      // this.mixer2.clipAction(gltf.animations[0]).play();

      this.scene.add(gltf.scene);

    //   this.ship1.position.set(0, 0, 0);
    //   this.ship2.position.set(0, 10, 0);

      const project = getProject('THREE.js x Theatre.js', {state: projectState});
      const sheet = project.sheet('scene');
      project.ready.then(() => sheet.sequence.play({ iterationCount: 1 }))

      const modelObj = sheet.object('Ship1 Controller', {
        position: { x: 0, y: 0, z: 0 },
        rotation: types.compound({
          x: types.number(0, { range: [-2, 2] }),
          y: types.number(0, { range: [-2, 2] }),
          z: types.number(0, { range: [-2, 2] }),
        }),
      });

    //   const modelObj2 = sheet.object('ship2 controller', {
    //     position: { x: 0, y: 10, z: 0 },
    //     rotation: types.compound({
    //       x: types.number(0, { range: [-2, 2] }),
    //       y: types.number(0, { range: [-2, 2] }),
    //       z: types.number(0, { range: [-2, 2] }),
    //     }),
    //   })

      modelObj.onValuesChange((val) => {
        this.ship1.position.set(val.position.x, val.position.y, val.position.z);
        this.ship1.rotation.set(val.rotation.x, val.rotation.y, val.rotation.z);
      });
    //   modelObj2.onValuesChange((val) => {
    //     this.ship2.position.set(val.position.x, val.position.y, val.position.z);
    //     this.ship2.rotation.set(val.rotation.x, val.rotation.y, val.rotation.z);
    //   });
    });
  }

  update(delta) {
    this.mixer1?.update(delta * 0.1);
    this.mixer2?.update(delta * 0.1);
  }
}
