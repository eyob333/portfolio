import App from "../App";
import gsap from "gsap";

import Nav from "./Nav";
import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import Contact from "./Contact";
import Models from "./Models";
import HUnderlay from "./HUnderlay";



export default class Ui{
    constructor(){
        this.app = new App()
        this.resouces = this.app.resources
        this.ui = null
        this.device = this.app.sizes.device
        this.themeObj = {}

        this.container = document.querySelector("div.section-container-div");
        this.underlay = document.querySelector("div.underlay-container-div")

        if(this.app.debug.active){
            this.ui = this.app.debug.ui.addFolder("Ui")
            this.setDebug()
        }

        this.nav = new Nav(this.container, this.ui)
        this.home = new Home(this.container, this.ui);
        this.project = new Project(this.container, this.ui, this.device, this.resouces);        
        this.models = new Models(this.container, this.ui, this.device, this.resouces)
        this.labs = new Labs(this.container, this.ui, this.device, this.resouces);
        this.contact = new Contact(this.container, this.ui)

        this.homeUnderlay = new HUnderlay(this.underlay, this.ui);

        this.setUi();
        this.setEvent();

    }

    setUi() {
        let element = document.querySelector('.main-icon svg');
        gsap.to(element, {
            y: 22
        })

        let title_c = gsap.utils.toArray('.nav-mask .title-cont')
        title_c.forEach(e => {
            gsap.to(e, {
                scale: 0,
            })

        });
        let icos = gsap.utils.toArray('.nav-mask .svg-cont svg') 
        icos.forEach(element => {
            gsap.to(element, {
                y: '21px',
            })
        });

    }


    setDebug(){
        this.ui.addFolder("main")
    }

    setEvent(){
        //theme change
        let device = this.app.sizes.device;
        let element = document.querySelector(".util .theme .icons-t")
        let te = document.querySelector('.transition-overlay')

        function snapElementToTarget(elementToMove, targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
                gsap.set(elementToMove, {
                    position: 'fixed',
                    top: targetRect.top,
                    left: targetRect.left,
                    width: targetRect.width,
                    height: targetRect.height,
                    margin: 0, 
                    zIndex: 9999
            });
        }
        

            gsap.set('.transition-overlay', {
                clipPath: `circle(0% at  50% 50%)`,
                                transformOrigin:'center' 
            });

        element.addEventListener('click', (e) => {
            console.log("yo") 
            console.log(element)
            snapElementToTarget(te, element)

            gsap.to('.transition-overlay', {
                clipPath: `circle(50% at 50% 50%)`,
                duration: 2.2,
                ease: 'power2.inOut',
                scale: 53,
                duration: 2.2,
                onComplete: () => {
                    gsap.to('.transition-overlay', {
                        clipPath: `circle(0% at  50% 50%)`,
                        scale: 1,
                        duration: 2
                    });
                   
                }
                
            });

            gsap.to(element, {
                rotate: '+=180deg',
                
            })
          
        })


        // link redirect
        const socialIcons = document.querySelectorAll('.soc-li');

        socialIcons.forEach(icon => {
            icon.style.cursor = 'pointer';

            icon.addEventListener('click', (e) => {
                console.log(e)
                e.stopPropagation()
                const url = icon.getAttribute('data-link');
                if (url && url !== '#') {
                    window.open(url, 'portfolio_tab', 'noopener,noreferrer');
                } else {
                    console.warn('Social icon clicked, but no valid destination URL was found.');
                }
            });
        });

        // main logo goto
        const homC = document.querySelector('#nav .main-icon .icon-mask')
        homC.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: `#home`,
                duration: 1.8,
                ease: "back.out(1)"

            })

        })

        const pts = gsap.utils.toArray('.wo-spacer svg')
        console.log(pts)
    }

}

