import App from "../App";
import * as THREE  from 'three'

export default class Ship{
    
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time

        this.resource = this.resources.item.Ship
        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Ship')
            .close()
        }
        this.setModel()
        this.setAnimation()

        if ( this.debug.active){
            this.shipPosition = this.debugFolder.addFolder('ship-position')
            this.shipRoation = this.debugFolder.addFolder('ship-rotation')

            this.shipPosition.add( this.model.position, 'x').name("x").step(0.001).max(10).min(-10)
            this.shipPosition.add( this.model.position, 'y').name("y").step(0.001).max(10).min(-10)
            this.shipPosition.add( this.model.position, 'z').name("z").step(0.001).max(10).min(-10)

            this.shipRoation.add( this.model.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            this.shipRoation.add( this.model.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            this.shipRoation.add( this.model.rotation, 'z').name("z").step(0.001).max(10).min(-10)
        }
    }

    setModel(){
        this.model = this.resource.scene
        this.model.scale.set( 1., 1., 1.)
        this.model.traverse( child =>{
            if ( child instanceof THREE.Mesh){
                // child.castShadow = true
            }
        })
        this.scene.add( this.model )
        console.log(this.resource)
    }
    setAnimation(){
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)


        this.animation.actions = {}
        this.animation.actions.rotate = this.animation.mixer.clipAction( this.resource.animations[0])
        this.animation.actions.current = this.animation.actions.rotate
        this.animation.actions.current.play()

        // this.animation.play =  name => {
        //     const newAction = this.animation.actions[name]
        //     const prevAction = this.animation.actions.current

        //     newAction.reset()
        //     newAction.play()
        //     newAction.crossFadeFrom(prevAction, 5)

        //     this.animation.actions.current = newAction
            
        // }

        // debug 
        
        if (this.debug.active){
            const debugObject = {
            idle: ()=> { this. animation.play('idle')},
            // walking: () => { this.animation.play('walking')},
            // running: () => { this.animation.play( 'running')},
            // some1: () => { this.animation.play( 'some1')},
            // some2: () => { this.animation.play( 'some2')},
            // some3: () => { this.animation.play( 'some3')},
            // some4: () => { this.animation.play( 'some4')},
            // some5: () => { this.animation.play( 'some5')},
            // some6: () => { this.animation.play( 'some6')},
            // some7: () => { this.animation.play( 'some7')},
            // some8: () => { this.animation.play( 'some8')},
            // some9: () => { this.animation.play( 'some9')},
            // some10: () => { this.animation.play( 'some10')}
            }

            this.debugFolder.add( debugObject,  'idle')
            // this.debugFolder.add( debugObject,  'walking')
            // this.debugFolder.add( debugObject,  'running')
            // this.debugFolder.add(debugObject, 'some1')
            // this.debugFolder.add(debugObject, 'some2')
            // this.debugFolder.add(debugObject, 'some3')
            // this.debugFolder.add(debugObject, 'some4')
            // this.debugFolder.add(debugObject, 'some5')
            // this.debugFolder.add(debugObject, 'some6')
            // this.debugFolder.add(debugObject, 'some7')
            // this.debugFolder.add(debugObject, 'some8')
            // this.debugFolder.add(debugObject, 'some9')
            // this.debugFolder.add(debugObject, 'some10')
       }}

    update(){
        this.animation.mixer.update( this.time.delta * 0.0001 )
    }
}