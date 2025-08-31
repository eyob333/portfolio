import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
// import { bloom } from 'three/addons/postprocessing/';
import App from "../App";


export default class Enviromet{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.camera = this.app.camera.instance
        this.sizes = this.app.sizes
        this.renderer = this.app.renderer.instance
    
        this.debug = this.app.debug

        this.setSunLight()
        this.setAmbientLight()
        this.setParams()
        // this.setPostProcess()

        if( this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Enviromet')
                .close();

            this.debugFolder.add( this.sunLight, 'intensity' ).name('SunLightIntensity').min(0).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'x' ).name('SunLightPositionX').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'y' ).name('SunLightPositionY').min(-10).max(10).step( 0.001)
            this.debugFolder.add( this.sunLight.position, 'z' ).name('SunLightPositionZ').min(-10).max(10).step( 0.001)

            this.debugFolder.add(this.ambient, 'intensity').name("AmbientLightIntesity").min(0).max(4).step(.001)

            this.setPostProcessDebug()
        }

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 1.641)
        this.sunLight.position.set( -0.999, 2.047, -1.761)
        this.scene.add( this.sunLight )
    }

    setAmbientLight(){
        this.ambient = new THREE.AmbientLight('#ffffff', .9)
        this.scene.add(this.ambient)
    }

    setParams(){
        this.params = {
            threshold: 0,
            strength: 1,
            radius: 0,
            exposure: 1,
            clearColor: '#000000',
            alpha: 1
        }  
    }

    setPostProcess(){


        const renderScene = new RenderPass( this.scene, this.camera );

        this.bloomPass = new UnrealBloomPass( new THREE.Vector2( this.sizes.width, this.sizes.height ));
        this.bloomPass.threshold = this.params.threshold;
        this.bloomPass.strength = this.params.strength;
        this.bloomPass.radius = this.params.radius;
        
        const outputPass = new OutputPass();

        this.composer = new EffectComposer( this.renderer);
        this.composer.addPass(renderScene) 
        this.composer.addPass(this.bloomPass)
        this.composer.addPass(outputPass)
       
    }
    
    setPostProcessDebug(){
        // const bloomGui = this.debugFolder.addFolder( 'bloom' );
        // bloomGui.add( this.params, 'threshold', 0.0, 3.0 ).onChange( () => {
        //     this.bloomPass.threshold = this.params.threshold;
        // } );
        // bloomGui.add( this.params, 'strength', 0.0, 3.0 ).onChange( () =>{
        //     this.bloomPass.strength = this.params.strength;
        // } );
        // bloomGui.add( this.params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange(  () => {
        //     this.bloomPass.radius = this.params.radius;
        // } );
        // bloomGui.add( this.params, 'exposure', 0.1, 2 ).onChange(  () => {
        //     this.renderer.toneMappingExposure = Math.pow( this.params.exposure, 4.0 );
        // } );
        const render = this.debugFolder.addFolder('render')
        render.addColor( this.params, 'clearColor').onChange(  () => {
            this.renderer.setClearColor(this.params.clearColor)
        } );
        render.add( this.renderer, 'toneMapping',{
            no: THREE.NoToneMapping,
            Liner: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
            })
        render.add(this.params, 'alpha').min(0).max(1).step(0.001).name('clear alpha').onChange( () =>{
            this.renderer.setClearAlpha(this.params.alpha)
        })
    }

    update(){
        if (this.composer){
            this.composer.render()
        }
    
    }

}