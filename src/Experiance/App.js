import * as THREE from 'three';
import Stats from 'stats-js';
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from "./Camera.js"
import Renderer from './Renderer.js'
import World from './World/World.js';
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import sources from './Sources.js'
import LoadingManager from './Controls/LoadingControler.js';
import Overlay from './Ui/Overlay.js';
import Animation from './Animation/Animation.js';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';
import { TextPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)


let instance = null;


var stats = new Stats();

export default class App{
    constructor(canvas){
        if (instance){
            return instance
        }
        instance = this

            // global acess            
        window.experiance = this

        this.initLenis()

        this.canvas = canvas
        this.sizes  = new Sizes()            
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.Overlay = new Overlay(this.scene)
        this.LoadingManager = new LoadingManager( this.Overlay);
        this.resources = new Resources( sources, this.LoadingManager.loadingManager)          
        this.camera = new Camera(this)
        this.renderer = new Renderer()
        this.world = new World()
        this.debug = new Debug

        gsap.ticker.lagSmoothing(0);
        
        

        this.resources.on('ready', () =>{
                setTimeout( () =>{
                    this.animation = new Animation(this.Overlay)
                    this.lenis.resize();
                    ScrollTrigger.refresh();
                }, 4000)   
            })    
        
        if(this.debug.active){
            stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild( stats.dom );
        }

        // resize
        this.sizes.on( 'resize', ()=> {
            this.resize()
        })

        this.time.on( 'tick', () => {
            this.update()
        })

    }
            
    resize(){
        this.camera.resize()
        this.renderer.resize()
        }

    update(){
        this.camera.update()
        this.renderer.update()
        this.world.update()
        if (this.debug.active){
            stats.update();
        }
        this.lenis.raf(performance.now());
  
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        // traverse scene
        this.scene.traverse( child => {
            if ( child instanceof THREE.Mesh ){
                child.geometry.dispose()
                for( const key in child.material){
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                };
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        if ( this.debug.active){
            this.debug.ui.destroy()
        }
    }

    initLenis() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical', // Use 'vertical' if doing GSAP pin-scroll, or 'horizontal' if native X-scroll
            gestureOrientation: 'both',
            smoothWheel: true,
            wheelMultiplier: 1,      // Ensure equal wheel sensitivity
            lerp: 0.1,               // Lower lerp = smoother catch-up on reverse
            syncTouch: true 
        });

        // Update GSAP ScrollTrigger whenever Lenis scrolls
        this.lenis.on('scroll', ScrollTrigger.update);
    }




}