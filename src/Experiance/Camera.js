import * as THREE from 'three'
import App from "./App.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera{

    constructor( ){
        this.experiance = new App()
        this.scene = this.experiance.scene
        this.sizes = this.experiance.sizes
        this.canvas = this.experiance.canvas
       
        this.setInstance()
        this.orbitControls()

        this.experiance.resources.on( 'ready', ()=>{ 
            this.setDebug()      
        })
    }
    
    setInstance(){
        this.instance = new THREE.PerspectiveCamera( 35, this.sizes.width/ this.sizes.height, 0.1, 100)
        this.instance.position.set(20, 10, 20 )
        this.scene.add( this.instance )
    }
    orbitControls(){
        this.controls = new OrbitControls( this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width/ this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    
    resize(){
        this.instance.aspect = this.sizes.width/ this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    setDebug(){
        this.debug = this.experiance.debug
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Camera')
                .close();
            this.posGui = this.debugFolder.addFolder('cam-position');
            this.rotGui = this.debugFolder.addFolder('cam-rotation');

            this.posGui.add(this.instance.position, 'x', -20,20).step(0.001).name('x').updateDisplay();
            this.posGui.add(this.instance.position, 'y', -20,20).step(0.001).name('y').updateDisplay();
            this.posGui.add(this.instance.position, 'z', -20,20).step(0.001).name('z').updateDisplay();

            this.rotGui .add(this.instance.rotation, 'x', -Math.PI * .5, Math.PI * .5).step(0.01).name('x');
            this.rotGui .add(this.instance.rotation, 'y', -Math.PI * .5, Math.PI * .5).step(0.01).name('y');
            this.rotGui .add(this.instance.rotation, 'z', -Math.PI * .5, Math.PI * .5).step(0.01).name('z')
        }
    }

    update(){
        this.controls.update()
    }
}

