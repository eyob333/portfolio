import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js';
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter{

    constructor(sources, loadingManager){
        super()
        this.sources = sources
        this.loadingManager = loadingManager
        
        //set up
        this.item = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
        this.loaders.dracoLoader = new DRACOLoader(this.loadingManager)
        this.loaders.dracoLoader.setDecoderPath('/draco/')
        this.loaders.textureLoader = new THREE.TextureLoader()
    
        this.loaders.gltfLoader.setDRACOLoader( this.loaders.dracoLoader )
        
    }

    startLoading(){
        // const source = this.sources[0];
        // this.loaders.gltfLoader.load(
        //     source.path,
        //         (file) => {
        //             console.log("some thing")
        //             this.sourceLoaded( source, file)
        //     })
        

        this.sources.forEach( source => {
            if( source.type === 'gltfModel'){
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded( source, file)
                    }
                )
            } 
            else if( source.type === 'texture'){
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>{
                        // file.repeat.set(8, 8)
                        // file.wrapS = THREE.RepeatWrapping
                        // file.wrapT= THREE.RepeatWrapping
                        this.sourceLoaded(source, file)
                    }
                )
            }

            else if (source.type === 'image') {
                this.loadingManager.itemStart(source.path); 

                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = source.path;
                
                img.onload = () => {
                    this.sourceLoaded(source, img);
                    this.loadingManager.itemEnd(source.path); 
                };
                img.onerror = () => {
                    this.loadingManager.itemError(source.path);
                };
            }
            

else if (source.type === 'video') {
    this.loadingManager.itemStart(source.path);

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.muted = true; // Crucial for mobile permission policies
    video.playsInline = true;
    video.src = source.path;

    let isFinished = false;

    const finishLoading = () => {
        if (!isFinished) {
            isFinished = true;
            this.sourceLoaded(source, video);
            this.loadingManager.itemEnd(source.path);
        }
    };

    // Listen to multiple fallback events since mobile can be finicky
    video.addEventListener('loadeddata', finishLoading, { once: true });
    video.addEventListener('canplay', finishLoading, { once: true });
    video.addEventListener('canplaythrough', finishLoading, { once: true });

    video.addEventListener('error', (e) => {
        if (!isFinished) {
            isFinished = true;
            console.warn(`Video warning/error on mobile: ${source.path}`, e);
            // Force finish anyway so mobile loader never locks up the app
            this.sourceLoaded(source, video);
            this.loadingManager.itemEnd(source.path);
        }
    });

    // SAFETY FALLBACK: If mobile refuses to fire video events for 4 seconds, force it through
    setTimeout(() => {
        if (!isFinished) {
            console.warn(`Video load timed out on mobile, forcing continuation: ${source.path}`);
            finishLoading();
        }
    }, 4000);

    video.load();
}

            else if (source.type === 'font') {
                this.loadingManager.itemStart(source.path);

                const fontFace = new FontFace(source.name, `url(${source.path})`);
                fontFace.load().chodzi(() => {}).then((loadedFont) => {
                    document.fonts.add(loadedFont);
                    this.sourceLoaded(source, loadedFont);
                    this.loadingManager.itemEnd(source.path);
                }).catch(() => {
                    this.loadingManager.itemError(source.path);
                });
            }



        });
    }

    sourceLoaded(source, file){
        this.item[source.name] = file
        this.loaded++ 

        if (this.loaded === this.toLoad ){
            console.log( 'ready' )
            
            this.trigger('ready')
        }
    }
}