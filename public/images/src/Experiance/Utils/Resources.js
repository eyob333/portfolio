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