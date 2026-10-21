import * as THREE from 'three'
import gsap from 'gsap';


const loadSvg = document.querySelector('.loader');
const loadInfo = document.querySelectorAll('.loder-info');


export default class LoadingManager{
    constructor(overlay){
        this.overlay = overlay
        this.overlayMaterial = this.overlay.material
        let hasStarted = false;

        this.loTimeL = gsap.timeline({
            id: "loader",
            repeat: -1,
            defaults: { duration: 2, stagger: .2 }
        })

        this.loOutroTl = gsap.timeline({ delay: 4})


        this.loadingManager =  new THREE.LoadingManager(
            () =>{
                // onComplete 
                this.loTimeL.pause()
                this.loOutroTl.to( loadSvg.querySelectorAll('.path'), { drawSVG: true , duration: .5})
                this.loOutroTl.to( loadSvg.querySelectorAll('.path'), { drawSVG: '0 0', duration: .8})
                
                this.loOutroTl.to( loadSvg, { opacity: 0, display: `none` })
                this.loOutroTl.to( loadInfo, { x: `310px`, display: `none` }) 
                this.loOutroTl.to( '.loader-cont', { display: `none`, duration: .01 })                 
                this.loOutroTl.to( this.overlayMaterial.uniforms.uAlpha, { duration: 5, value: .0, delay: 1, ease: 'expo.out', onComplete: () =>{ this.overlay.destroy() } }) 



                this.isReady = true;

                
            },
            (itemUrl, itemLoaded, itemTotal) => {
                // onProgress 
               

                const currentItem = Math.round( (itemLoaded / itemTotal)  * 4); 

                switch (currentItem) {
                    case 0:
                        this.timeL(`parsing model`);
                        break;
                    case 1:
                        this.timeL(`loading texture, model...`);
                        break;
                    case 2:
                        this.timeL(`loading assets... `);
                        break;
                    case 3:
                        this.timeL(`rasterizing font`);
                        break;
                    case 4:
                        this.timeL(`finalizing scene`);
                        break;      

                    default:
                        break;
                }

                  
            }
        );

        // onStart 
        this.loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
            if (!hasStarted) {
                hasStarted = true;
                console.log('Loading has started!');

                gsap.to('.down-push', { y: '38px', x: '20px', })
                gsap.to( loadInfo, { x: 0, duration: .8, delay: 2., ease: `power4.out`})


                const loEl = gsap.utils.toArray('.path')

                this.loTimeL.to( loEl, { drawSVG: "100% 100%", delay: 1. });
                this.loTimeL.to( loEl, { drawSVG: "50% 50%" });
                this.loTimeL.to( loEl, { drawSVG: true}, `-=.8`);
                                                
            }
        }

    }


    timeL(newText) {
        console.log(`jjjj`, newText)
        const loadingTextElement = document.querySelector('.loder-text p');
        if (!loadingTextElement) return;

        // Fade out and move down slightly, change text, then fade in
        gsap.to(loadingTextElement, {
            opacity: 0,
            y: 43,
            duration: 0.2,
            onComplete: () => {
                loadingTextElement.innerText = newText;
                gsap.to(loadingTextElement, {
                    opacity: 1,
                    y: 10,
                    duration: 0.3
                });
            }
        });

    }


}
