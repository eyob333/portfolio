import * as THREE from 'three';
import { SceneManager } from './SceneManager.js';
import { ModelLoader } from './ModelLoader.js';
import { Overlay } from './Overlay.js';
import { setupGUI } from './UI.js';
import { TechStack } from './TechStack.js';
import studio from '@theatre/studio';
import { LoadingManager } from './LoadingManager.js';
import { Lights } from './Lights.js'
import { InjectorManager } from './InjectorManager.js';
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);


export class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.sceneManager = new SceneManager(this.scene, this.camera, this.renderer);
    this.overlay = new Overlay(this.scene);
    
    this.Lmanager = new LoadingManager(this.overlay.material);
    this.modelLoader = new ModelLoader(this.scene, this.Lmanager.loadingManager);
    this.lights = new Lights(this.scene);
    this.inject = new InjectorManager();
    this.techStack = new TechStack();
    this.gui = setupGUI(this.camera);
    this.init();
 

  }

  init() {
    studio.initialize();
    this.camera.position.set(-1, 0, 6);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    window.addEventListener('resize', () => this.sceneManager.onResize());
    this.tick();
  }

  tick() {
    const delta = this.clock.getDelta();
    this.modelLoader.update(delta);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.tick());
  }
}
