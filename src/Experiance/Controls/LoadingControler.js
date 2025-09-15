import * as THREE from 'three'
import gsap from 'gsap';

const loadingTExtElement = document.querySelector("div.loading-text");
const loadingElement = document.querySelector("div.loading-bar");
const loadingNumberElement = document.querySelector("p.loading-number");
const bodyElement = document.querySelector("body")

export default class LoadingManager{
    constructor(overlay){
        this.overlay = overlay
        this.overlaymaterial = this.overlay.material
        
        this.sectionContainingElement = document.querySelector("div.section-container-div");
  
        this.loadingManager =  new THREE.LoadingManager(
            () =>{
                window.setTimeout( () => {
                    gsap.to( this.overlaymaterial.uniforms.uAlpha, {
                            duration: 5, value: .0, delay: 1, ease: 'expo.out', onComplete: () =>{
                            this.overlay.destroy()
                        }
                    }) 
                    loadingElement.classList.add('enabled');
                    loadingElement.style.transform = '';
                    gsap.to(loadingTExtElement, {
                        opacity: 0, 
                        transformOrigin: 'center',
                        duration: 3,
                        delay: 1,
                        ease: 'power2.out',
                        display: 'none'
                    })
                    setTimeout( () =>{
                        bodyElement.style.padding = '0 2%'
                        bodyElement.style.overflowX = 'hidden'
                        bodyElement.style.overflowY = 'auto'
                    }, [3000])
                
                }, 1000)  
                this.isReady = true;
            },
            (itemUrl, itemLoaded, itemTotal) => {
                loadingNumberElement.innerHTML = `${Math.round((itemLoaded/itemTotal * 100) * 10)/10}%`;
                loadingElement.style.transform =  `scaleX( ${(itemLoaded/itemTotal)})`;
            }
        );

    }
}
