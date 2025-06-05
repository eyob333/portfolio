import * as THREE from 'three';
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
import Ui from './Ui/Ui.js';

let instance = null;

export default class App{
    constructor(canvas){
        if (instance){
            return instance
        }
        instance = this

            // global acess            
        window.experiance = this

        this.canvas = canvas
        this.sizes  = new Sizes()            
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.LoadingManager = new LoadingManager( new Overlay(this.scene));
        this.resources = new Resources( sources, this.LoadingManager.loadingManager)          
        this.camera = new Camera(this)
        this.renderer = new Renderer()
        this.world = new World()
        this.ui = new Ui()
        this.debug = new Debug

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
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        // triverse scene
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
}