import * as THREE  from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import icons from '../../assets/techStackIcons';

import App from "../App";

export default class Hangar{
    
    constructor(){
        this.app = new App()
        this.scene = this.app.scene
        this.resources = this.app.resources
        this.time = this.app.time

        this.resource = this.resources.item.Hangar
        this.resourceT = this.resources.item.HangarT
        this.resourceT.flipY = false
        this.resourceT.colorSpace = THREE.SRGBColorSpace

        console.log(this.resourceT)

        this.debug = this.app.debug
        
        if (this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Hanger')
            .close()
        }
        this.setInstance()

        if ( this.debug.active){
            let stationPosition = this.debugFolder.addFolder('Hangar-position')
            let stationRoation = this.debugFolder.addFolder('Hangar-rotation')

            stationPosition.add( this.instance.position, 'x').name("x").step(0.001).max(10).min(-10)
            stationPosition.add( this.instance.position, 'y').name("y").step(0.001).max(10).min(-10)
            stationPosition.add( this.instance.position, 'z').name("z").step(0.001).max(10).min(-10)

            stationRoation.add( this.instance.rotation, 'x').name("x").step(0.001).max(10).min(-10)
            stationRoation.add( this.instance.rotation, 'y').name("y").step(0.001).max(10).min(-10)
            stationRoation.add( this.instance.rotation, 'z').name("z").step(0.001).max(10).min(-10)
        }

    }


    setInstance(){
        let material = new THREE.MeshBasicMaterial({map: this.resourceT})
        this.instance = this.resource.scene
        this.screen = this.instance.children[1]
        console.log(this.screen)
        this.instance.scale.set( .5, .5, .5)
        this.instance.traverse( child =>{ child.material = material })
        console.log(this.instance)
        this.instance.visble = false
        this.scene.add( this.instance )
    }   

    setScreen(element) {
        function divToCanvas(div, callback) {
            const data = `
                <svg xmlns="http://www.w3.org/2000/svg" width="${div.offsetWidth}" height="${div.offsetHeight}">
                <foreignObject width="100%" height="100%">
                    ${new XMLSerializer().serializeToString(div)}
                </foreignObject>
                </svg>
            `;
            const svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svg);

            const img = new Image();
            img.crossOrigin = "anonymous";  // ✅ prevents tainting
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = div.offsetWidth;
                canvas.height = div.offsetHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                URL.revokeObjectURL(url);
                callback(canvas);
            };
            img.src = url;
        }

        // Take our div and put it on a 3D plane
        const div = element;
        divToCanvas(div, (canvas) => {
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            this.screen.material = material;
        })
    }

    setScreen1() {

        // 3. CSS3D renderer (for iframe)
        this.cssRenderer = new CSS3DRenderer();
        this.cssRenderer.setSize(this.app.sizes.width, this.app.sizes.height);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0';
        document.body.appendChild(this.cssRenderer.domElement);


        // 5. Create iframe with div inside
        const iframe = document.createElement('iframe');
        iframe.srcdoc = `
                <section>
                <h1>Tech Stack</h1>
                <div class="techStack-container">
                    ${icons.map(icon => `
                    <div class="icons-container">
                        <div class="svg-container">${icon.svg}</div>
                        <p>${icon.name}</p>
                    </div>
                    `).join('')}
                </div> 
                </section> 
        `;
        console.log(iframe)
        iframe.style.width = '400px';
        iframe.style.height = '300px';
        iframe.style.border = '0';

        const cssObject = new CSS3DObject(iframe);
        // cssObject.position.copy(this.screen.position); 
        // cssObject.rotation.copy(this.screen.rotation)
        this.app.scene.add(cssObject);


    }

    update(){
        this.cssRenderer.render(this.app.scene, this.app.camera);
    }

    
}