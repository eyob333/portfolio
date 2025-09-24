import * as THREE from 'three'
import App from "../App";

export default class Cockpit{
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resource = this.app.resources.item.Cockpit

        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Cockpit')
            .close()
        }
        this.setElement()
        this.setInstance()

        if ( this.debug.active){
            let cockPitPosition = this.debugFolder.addFolder('cockpit-position')
            let cockPitRotaion = this.debugFolder.addFolder('cockpit-rotation')

            cockPitPosition.add( this.instance.position, 'x').name("x").step(0.001).max(10).min(-10)
            cockPitPosition.add( this.instance.position, 'y').name("y").step(0.001).max(10).min(-10)
            cockPitPosition.add( this.instance.position, 'z').name("z").step(0.001).max(10).min(-10)

            cockPitRotaion.add( this.instance.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            cockPitRotaion.add( this.instance.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            cockPitRotaion.add( this.instance.rotation, 'z').name("z").step(0.001).max(10).min(-10)
            
        }
    
    
    }
    setElement(){
        let video = document.createElement("video")
        video.src ='/videos/stone.mp4'
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        video.play().catch(err => {
        console.warn("Autoplay prevented, waiting for user interaction");
        // Optional: add a click handler to resume
        window.addEventListener("click", () => {
            video.play();
        }, { once: true });
        });

        this.videoT = new THREE.VideoTexture(video);
        this.videoT.minFilter = THREE.LinearFilter;
        this.videoT.magFilter = THREE.LinearFilter;
        this.videoT.format = THREE.RGBAFormat

    }

    setInstance(){
        let material = new THREE.MeshBasicMaterial({map: this.videoT})
        this.instance = this.resource.scene
    
        this.instance.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = false
                child.material.side = THREE.FrontSide
            }
        })
        let screenM = this.instance.children.find( child => child.name === 'screenM')
        let screenR = this.instance.children.find( child => child.name === 'screenM')
        let screenL = this.instance.children.find( child => child.name === 'screenM')
        let screenS = this.instance.children.find( child => child.name === 'screenM')
        screenM.material = material
        console.log(this.instance)
        this.instance.scale.set(.5, .5, .5)
        this.scene.add(this.instance)
    }
}