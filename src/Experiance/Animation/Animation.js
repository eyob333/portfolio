import * as THREE from 'three'
import gsap from "gsap";
import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';

let container = document.querySelector("div.section-container-div");
let scrollNav = document.querySelector('div.navigaton-bar')
let primeWord;
let secWord ;
let thiWord;
let fouWord;

export default class Animation{

    constructor(){
        this.app = new App();
        this.ui = new Ui();
        this.bones = this.app.nomad.bones
        this.angles = this.app.nomad.angles  


        const t1 = gsap.timeline({
            defaults: {
                duration: 2,
                ease: 'power1.inOut'
            }
        })


        t1
            .to(this.app.camera.controls.target, {
                y: 9.5,
                duration: 2,
                ease: 'power2.out',
                onComplete: () =>{
                    container.style.visibility= 'visible';
                    container.style.maxHeight = '100vh';
                    container.style.maxWidth = '100%';
                    container.style.overflow = 'auto';
                    container.style.scrollbarWidth= 'none';
                    this.ui.home.setInstance();
                    let prime = document.querySelector('h4.primary')
                    let second = document.querySelector('h4.secondary')
                    let third = document.querySelector('h4.teritiary')
                    let forth = document.querySelector('h4.fourth')

                    prime.style.willChange =' transform, opacity'
                    second.style.willChange =' transform, opacity'
                    third.style.willChange =' transform, opacity'
                    forth.style.willChange =' transform, opacity'

                    primeWord = new SplitType(prime)
                    secWord = new SplitType(second)
                    thiWord = new SplitType(third)
                    fouWord = new SplitType(forth)

                    gsap
                        .set("h4.primary", {
                            yPercent: 100,
                        })
    
                        // .set("h4.secondary", {
                        //     // opacity: 0,
                        //     yPercent: -100,
                        //     // stagger: .3
                        // })
                    gsap.set("h4.teritiary", {
                            // opacity: 0,
                            yPercent: -100,
                            // stagger: .3
                        })
                    gsap.set("h4.fourth", {
                            // opacity: 0,
                            yPercent: -200,
                        })
                    gsap.set([primeWord.chars, secWord.chars, thiWord.chars, fouWord.chars], {
                        opacity: 0,
                        skewX: -10,
                    })
                

                }
            })
            .to(this.app.world.Enviromet.params, {
                alpha: 0, 
                onUpdate: () =>{
                    this.app.renderer.instance.setClearAlpha(this.app.world.Enviromet.params.alpha)
                }
            })
            .to(this.app.camera.instance.position, {
                x:1.7451, y: 10.9374, z:-2.2750,
                duration: 4,
                ease: 'power4.out'
            }, '>-2')
            .to(this.app.camera.controls.target, {
                y: 10.3,
                ease: 'power1.inOut',
                onComplete: () =>{

                    const t2 = gsap.timeline({
                        defaults: {
                            ease: 'power1.inOut',
                            // yoyo: true,
                            duration: 1,
                            yPercent: -100,
                            stagger: .04,
                            opacity: 1,
                            skewX: 0
                        },
                        repeat: -1,
                        // yoyo: true
                    })
                    gsap.to( scrollNav, {
                            scaleY: 1,
                            duration: 1.5,
                            opacity: .5,
                            ease: "power3.Out",
                            repeat: 0
                        })
            
                    // console.log(primeWord)
                    t2  
                        .to(primeWord.chars, {

                        })
                        .to(primeWord.chars, {
                            delay: 2,
                            yPercent: -200,
                            opacity: 0,
                            skewX: 10,
                            ease: 'power2.in'
                        })
                        .to(secWord.chars, {
                        }, '-=1.5')
                        .to(secWord.chars, {
                            delay: 2,
                            yPercent: -200,
                            opacity: 0,
                            skewX: 10,
                            ease: 'power2.in'
                        })
                        .to(thiWord.chars, {
                        }, '-=1.5')
                        .to(thiWord.chars, {
                            delay: 2,
                            yPercent: -200,
                            opacity: 0,
                            skewX: 10,
                            ease: 'power2.in'
                        }, )
                        .to(fouWord.chars, {
                        }, '-=1.5')
                        .to(fouWord.chars, {
                            delay: 2,
                            yPercent: -200,
                            opacity: 0,
                            skewX: 10,
                            ease: 'power2.in'
                            
                        })
                        // .to("h4.primary", {
                        //     // opacity: 0,
                        //     yPercent: -100,
                        //     // stagger: .3
                        // })
                        // .to("h4.secondary", {
                        //     // opacity: 0,
                        //     yPercent: -100,
                        //     // stagger: .3
                        // }, '>')
                        // .to("h4.teritiary", {
                        //     // opacity: 0,
                        //     yPercent: -200,
                        //     // stagger: .3
                        // }, '>')
                        // .to("h4.fourth", {
                        //     // opacity: 0,
                        //     yPercent: -300,
                        // }, '>')
                        // .pause()
                    
                }
            }, '<');



        const t3 = gsap.timeline()
        t3
            .to(this.app.camera.controls.target, {
                y: 0,
                duration: 3,
                ease: 'power4.inOut'
            })
            .to(this.app.camera.instance.position, {
                x: 2.94563, y:2.13268, z: 2.63683,
                duration: 5,
                ease: 'power4.out'
            }, '<')

        this.master = gsap.timeline()
        this.master
            .add(t1)
            .add(t3, '+=5')

    }

}
