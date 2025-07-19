import * as THREE  from 'three'
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
                // .close()
        }

        this.setModel()
        this.setAnimation()

        this.Skeleton = new Skeleton(this.debugFolder)
        this.Skeleton.setFlyingPose()
        // this.pose = new Pose(this.skel);
        // this.Skeleton.getBones()

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
        this.scaleFactor.value = 0.30948;
        this.app.nomad.scene.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
        this.app.nomad.scene.position.set(20, 5.734,20)
        this.app.nomad.scene.rotation.set(0, 3.892 , 0)
        this.scene.add(  this.app.nomad.scene )
    }

    setAnimation(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.app.nomad.scene)

        this.animation.actions = {}
        this.animation.actions.rotate = this.animation.mixer.clipAction( this.app.nomad.animations[0])
        this.animation.actions.current = this.animation.actions.rotate
        this.animation.actions.current.play()

        // debug 
        
        if (this.debug.active){
            let clicked_float = true;
            let clicked_flying = true;

            const debugObject = {
            float_pose: () => {
                if (clicked_float) {
                    this.Skeleton.setFloatPose();
                    clicked_float = !clicked_float;
                } 
                // else {
                //     this.Skeleton.delete_float_pose();
                // }
            },

            flying_pose: () => {
                if (clicked_flying) {
                    console.log("flying_pose");
                    this.Skeleton.setFlyingPose();
                    clicked_flying = !clicked_flying;
                }
               
            }
            };

            this.debugFolder.add( debugObject,  'float_pose')
            this.debugFolder.add( debugObject,  'flying_pose')
       }}

    update(){
        // this.animation.mixer.update( this.time.delta * 0.0005 )
    }
}