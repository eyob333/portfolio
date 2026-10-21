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
        this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
    
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
            video.preload = 'auto';
            video.muted = true;
            video.loop = true; // if you want it looping for the texture
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.setAttribute('muted', '');

            // Safari wants it in the DOM with real size, but it must not affect layout
            Object.assign(video.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '320px',
            height: '180px',
            opacity: '0',
            pointerEvents: 'none',
            zIndex: '-1',
            contain: 'strict'
            });
            video.width = 320;
            video.height = 180;

            document.body.appendChild(video);
            video.src = source.path;

            let isFinished = false;

            const finishLoading = () => {
                if (!isFinished) {
                    isFinished = true;
                    
                    // Clean up the temporary DOM node once loaded
                    if (video.parentNode) {
                        video.parentNode.removeChild(video);
                    }

                    this.sourceLoaded(source, video);
                    this.loadingManager.itemEnd(source.path);
                }
            };

            video.addEventListener('loadeddata', finishLoading, { once: true });
            video.addEventListener('canplay', finishLoading, { once: true });
            video.addEventListener('canplaythrough', finishLoading, { once: true });

            video.addEventListener('error', (e) => {
                if (!isFinished) {
                    console.warn(`Video error caught in Safari: ${source.path}`, e);
                    finishLoading();
                }
            });

            // Safety fallback timeout
            setTimeout(() => {
                if (!isFinished) {
                    console.warn(`Safari video load timed out, forcing continuation: ${source.path}`);
                    finishLoading();
                }
            }, 4000);

            video.load();
        }

        else if (source.type === 'font') {
            this.loadingManager.itemStart(source.path);

            const fontUrl = `url("${encodeURI(source.path)}")`;
            
            // Pass font-weight, font-style, and display properties as descriptors
            const fontOptions = {
                weight: source.weight || 'normal',
                style: source.style || 'normal',
                display: source.display || 'swap'
            };

            const font = new FontFace(source.name, fontUrl, fontOptions);

            font.load()
                .then((loadedFont) => {
                    document.fonts.add(loadedFont);
                    this.sourceLoaded(source, loadedFont);
                    this.loadingManager.itemEnd(source.path);
                })
                .catch((error) => {
                    console.warn(`Failed to load font (${source.path}):`, error);
                    this.sourceLoaded(source, null);
                    this.loadingManager.itemEnd(source.path);
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