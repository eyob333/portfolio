import * as THREE from 'three'
import App from "./App.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default class Camera{

    constructor(){
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
        this.instance.position.set( 23.797233229425423, 8.501918977098187, 23.137258822075566)
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
    
    setDebug(){
        this.debug = this.experiance.debug
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Camera')
                .close();
            this.posGui = this.debugFolder.addFolder('cam-position');
            this.rotGui = this.debugFolder.addFolder('cam-rotation');

            this.posGui.add(this.instance.position, 'x', -20,20).step(0.00001).name('x').listen();
            this.posGui.add(this.instance.position, 'y', -20,20).step(0.00001).name('y').listen();
            this.posGui.add(this.instance.position, 'z', -20,20).step(0.00001).name('z').listen();

            this.rotGui .add(this.instance.rotation, 'x', -Math.PI * .5, Math.PI * .5).step(0.01).name('x').listen();
            this.rotGui .add(this.instance.rotation, 'y', -Math.PI * .5, Math.PI * .5).step(0.01).name('y').listen();
            this.rotGui .add(this.instance.rotation, 'z', -Math.PI * .5, Math.PI * .5).step(0.01).name('z').listen();
        }
    }

    update(){
        this.controls.update()
    }
}

