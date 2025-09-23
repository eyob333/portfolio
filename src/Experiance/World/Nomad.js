// main.js or main.ts
import * as THREE from 'three';
import App from "../App";
import Skeleton from "./Skeletons/Skeleton";

export default class Nomad{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time
        this.app.nomad = this.resources.item.Nomad

        this.debug = this.app.debug

        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Nomad')
                .close()
        }

        this.setModel()
        this.setPod()
        this.Skeleton = new Skeleton(this.debugFolder)

        if ( this.debug.active){
            this.nomPosition = this.debugFolder.addFolder('nom-position')
            this.nomRotation = this.debugFolder.addFolder('nom-rotation')
            this.nomScale = this.debugFolder.addFolder('nom-scale')

            this.nomPosition.add( this.app.nomad.scene.position, 'x').name("x").step(0.001).max(20).min(-20)
            this.nomPosition.add( this.app.nomad.scene.position, 'y').name("y").step(0.001).max(20).min(-20)
            this.nomPosition.add( this.app.nomad.scene.position, 'z').name("z").step(0.001).max(20).min(-20)

            this.nomRotation.add( this.app.nomad.scene.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            this.nomRotation.add( this.app.nomad.scene.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            this.nomRotation.add( this.app.nomad.scene.rotation, 'z').name("z").step(0.001).max(10).min(-10)

            this.nomScale.add( this.scaleFactor, 'value').name("scaleFactor").step(0.00001).max(10).min(0)
                .onChange( () => {
                    this.app.nomad.scene.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
                } )
        }
    }

    setModel(){
        this.scaleFactor = {};
        this.scaleFactor.value = 1;
        this.app.nomad.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = false
                child.material.side = THREE.FrontSide
            }
        })
        this.app.nomad.scene.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
        this.app.nomad.scene.position.set(0, 7, 0)
        this.app.nomad.scene.rotation.set(0, Math.PI, 0)

        this.scene.add(  this.app.nomad.scene )
    }


    setPod(){
        this.podScale = {}
        this.pod = this.resources.item.Pod

        this.pod.scene.position.set(.1, 6.7, 1)
        this.pod.scene.scale.set(.1, .1, .1)
        this.pod.scene.traverse( child =>{
            if ( child instanceof THREE.Mesh){
                child.castShadow = false
                child.material.side = THREE.FrontSide
            }
        })
        this.scene.add(this.pod.scene)

    }

    update(){
        // this.animation.mixer.update( this.time.delta * 0.0005 )
        // this.labelRenderer.render(this.scene, this.app.camera.instance);
    }
}