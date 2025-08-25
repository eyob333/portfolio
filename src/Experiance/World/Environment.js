import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import App from "../App";


export default class Enviromet{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.renderer = this.app.renderer.instance
        this.debug = this.app.debug


        this.setSunLight()
        this.setAmbientLight()

        if( this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Enviromet')
                .close();

            this.debugFolder.add( this.sunLight, 'intensity' ).name('SunLightIntensity').min(0).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'x' ).name('SunLightPositionX').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'y' ).name('SunLightPositionY').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'z' ).name('SunLightPositionZ').min(-10).max(10).step( 0.001)

            this.debugFolder.add(this.ambient, 'intensity').name("AmbientLightIntesity").min(0).max(4).step(.001)
        }

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3.993)
        this.sunLight.position.set( -0.999, 2.047, -1.761)
        this.scene.add( this.sunLight )
    }

    setAmbientLight(){
        this.ambient = new THREE.AmbientLight('#ffffff', 1.44)
        this.scene.add(this.ambient)
    }

    setPostProcess(){
        this.params = {}
        const renderScene = new RenderPass( scene, camera );

        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ));
        bloomPass.threshold = this.params.threshold;
        bloomPass.strength = this.params.strength;
        bloomPass.radius = this.params.radius;
        
        const outputPass = new OutputPass();

        composer = new EffectComposer( renderer);
        composer.addPass(renderScene)
        composer.addPass(bloomPass)
        composer.addPass(outputPass)
        
    }
    setPostProcessDebug(){
        const bloomGui = gui.addFolder( 'bloom' );
        bloomGui.add( this.params, 'threshold', 0.0, 1.0 ).onChange( function ( value ) {
            bloomPass.threshold = Number( value );
        } );
        bloomGui.add( this.params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {
            bloomPass.strength = Number( value );
        } );
        bloomGui.add( this.params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {
            bloomPass.radius = Number( value );
        } );
        bloomGui.add( this.params, 'exposure', 0.1, 2 ).onChange( function ( value ) {
            renderer.toneMappingExposure = Math.pow( value, 4.0 );
        } );
    }
    

}