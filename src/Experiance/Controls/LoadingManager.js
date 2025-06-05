import * as THREE from 'three'
import gsap from 'gsap';


const sectionContainingElement = document.querySelector("div.section-container-div");
const loadingTExtElement = document.querySelector("div.loading-text");
const loadingElement = document.querySelector("div.loading-bar");
const loadingNumberElement = document.querySelector("p.loading-number");
const bodyElement = document.querySelector("body")

export default class LoadingManager{
    constructor(overlay){
        this.overlay = overlay
        this.overlaymaterial = this.overlay.material
  
        this.loadingManager =  new THREE.LoadingManager(
            () =>{
                window.setTimeout( () => {
                gsap.to(this.overlaymaterial.uniforms.uAlpha, {duration: 4, value:0, delay: 1}) 
                loadingElement.classList.add('enabled');
                loadingElement.style.transform = '';
                gsap.to(loadingTExtElement, {
                    scale: 0,
                    x: '200px',
                    duration: 3,
                    delay: 1,
                    ease: 'power2.out'
                })
                setTimeout( () =>{
                    sectionContainingElement.style.visibility= 'visible';
                    sectionContainingElement.style.maxHeight = '100%';
                    sectionContainingElement.style.maxWidth = '100%';
                    // sectionContainingElement.style.overflow = 'auto';
                    bodyElement.style.padding = '0 2%'
                    bodyElement.style.overflowX = 'hidden'
                    bodyElement.style.overflowY = 'auto'
                }, [3000])
                }, 1000)  
                this.overlay.destroy()
            },
            (itemUrl, itemLoaded, itemTotal) => {
                loadingNumberElement.innerHTML = `${Math.round((itemLoaded/itemTotal * 100) * 10)/10}%`;
                loadingElement.style.transform =  `scaleX( ${(itemLoaded/itemTotal)})`;
            }
        );
    }
}
