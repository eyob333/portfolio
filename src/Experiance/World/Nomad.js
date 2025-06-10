import * as THREE  from 'three'
import App from "../App";
import Skeleton from "./Skeletons/Skeleton";

export default class Nomad{

    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time
        this.resource = this.resources.item.Nomad

        this.debug = this.app.debug

        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Nomad')
                .close()
        }

        this.setModel()
        this.setAnimation()

        this.Skeleton = new Skeleton(this.model, this.debugFolder)

        if ( this.debug.active){
            this.nomPosition = this.debugFolder.addFolder('nom-position')
            this.nomRotation = this.debugFolder.addFolder('nom-rotation')

            this.nomPosition.add( this.model.position, 'x').name("x").step(0.001).max(10).min(-10)
            this.nomPosition.add( this.model.position, 'y').name("y").step(0.001).max(10).min(-10)
            this.nomPosition.add( this.model.position, 'z').name("z").step(0.001).max(10).min(-10)

            this.nomRotation.add( this.model.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            this.nomRotation.add( this.model.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            this.nomRotation.add( this.model.rotation, 'z').name("z").step(0.001).max(10).min(-10)
        }
    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set( 1., 1., 1.)
        this.model.position.set(3.98,  0.664, 4.067)
        this.scene.add( this.model )
    }

    setAnimation(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)


        this.animation.actions = {}
        this.animation.actions.rotate = this.animation.mixer.clipAction( this.resource.animations[0])
        this.animation.actions.current = this.animation.actions.rotate
        this.animation.actions.current.play()

        // debug 
        
        if (this.debug.active){
            const debugObject = {
            idle: ()=> { this.Skeleton.getBonesByName()},
            }

            this.debugFolder.add( debugObject,  'idle')
       }}

    update(){
        // this.animation.mixer.update( this.time.delta * 0.0005 )
    }
}