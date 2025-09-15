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
        this.app.nomad.scene.scale.set(this.scaleFactor.value, this.scaleFactor.value, this.scaleFactor.value)
        this.app.nomad.scene.position.set(0, 10, 0)
        this.app.nomad.scene.rotation.set(0, Math.PI, 0)
        this.scene.add(  this.app.nomad.scene )
    }
    makeTextSprite(message, parameters = {}) {
        const fontFace = parameters.fontFace || "Anurati";   // use your CDN font
        const fontSize = parameters.fontSize || 256;          // render big for sharpness
        const textColor = parameters.color || "white";

        // Create high-res canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Bigger canvas = sharper text
        canvas.width = 4096;
        canvas.height = 2048;

        ctx.font = `${fontSize}px '${fontFace}'`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(message, canvas.width / 2, canvas.height / 2);

        // Make texture
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy =  this.app.renderer.instance.capabilities.getMaxAnisotropy();

        const material = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthTest: true,
            depthWrite: false
        });

        const sprite = new THREE.Sprite(material);

        // Scale sprite to match aspect ratio
        const scaleFactor = parameters.scale || 3;
        //   const baseScale = options.scale || 4;  // world units
        sprite.scale.set(
            (canvas.width / canvas.height) * scaleFactor,
            1 * scaleFactor,
            1
        );

        return sprite;
    }


    async setPod(){
        this.podScale = {}
        this.pod = this.resources.item.Pod
        this.pod.scene.position.set(.1, 9.7, 1)
        this.pod.scene.scale.set(.1, .1, .1)
        this.scene.add(this.pod.scene)

        
        // const label = this.makeTextSprite("WINTER NOMAD", { fontFace: "Anurati", fontSize: 128, scale: 3.5 });
        // label.position.set(-.3, 11, .5);
        // // label.scale.set(5.2, 5.2, 5.2)
        // this.scene.add(label);

    }

    update(){
        // this.animation.mixer.update( this.time.delta * 0.0005 )
        // this.labelRenderer.render(this.scene, this.app.camera.instance);
    }
}