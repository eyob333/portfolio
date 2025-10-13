import * as THREE from 'three'
import gsap from "gsap";
import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';
import Event from '../Utils/Event';
// import RayCaster from '../Utils/RayCaster';

let container = document.querySelector("div.section-container-div");
let scrollNav = document.querySelector('div.navigaton-bar')
let primeWord;
let secWord ;
let thiWord;
let fouWord;

export default class Animation{

    constructor(overlay){
        this.app = new App();
        this.ui = new Ui();
        this.bones = this.app.nomad.bones
        this.angles = this.app.nomad.angles  
        this.overlay = overlay

        this.event = new Event(this.app.ship)
        // this.raycast = new RayCaster()



        const t1 = gsap.timeline({
            defaults: {
                duration: 2,
                ease: 'power1.inOut'
            }
        })

        t1
            .to(this.app.camera.controls.target, {
                x: this.app.nomad.scene.position.x, y: this.app.nomad.scene.position.y, z: this.app.nomad.scene.position.z,
                duration: 2,
                ease: 'sine',
                onComplete: () =>{
                    container.style.visibility= 'visible';
                    container.style.maxHeight = '100vh';
                    container.style.maxWidth = '100%';
                    container.style.overflow = 'none';
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

                    gsap.set("h4.primary", {
                            yPercent: 100,
                        })

                    // gsap.set("h4.secondary", {
                        // })
                    gsap.set("h4.teritiary", {
                            yPercent: -100,
                        })
                    gsap.set("h4.fourth", {
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
                x:1.7451, y: 7.9374, z:-2.2750,
                duration: 4,
                ease: 'power4.out'
            }, '>-2')
            .to(this.app.camera.controls.target, {
                y: 7.3,
                ease: 'power1.inOut',
                onComplete: () =>{

                    const t2 = gsap.timeline({
                        defaults: {
                            ease: 'power1.inOut',
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
                            opacity: .1,
                            ease: "power3.Out",
                            repeat: 0
                        })
            
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
                }
            }, '<');


        const t3 = gsap.timeline()
        t3
            .to(this.app.camera.instance.position, {
                 x:1.0547, y:1.0451, z: 1.0744,
                duration: 4,
                onStart: () =>{
                    this.app.ship.visible = true
                },
                ease: 'power4.out'
            }, '<')
            .to(this.app.nomad.scene.position,{
                y: .5, z: .3,
                duration: 3,
                ease: 'power1.Out',
                onUpdate: () =>{
                    this.app.camera.controls.target.copy(this.app.nomad.scene.position)
                },
                onComplete: () => {
                    // this.app.scene.remove(this.app.nomad.scene)
                    this.app.nomad.scene.visible = false
                    // this.app.scene.remove(this.app.world.Nomad.pod.scene)
                    this.app.world.Station.instance.visible = true

                    gsap.to(this.app.world.Enviromet.params, {
                        alpha: 1,
                        onUpdate: () =>{
                            this.app.renderer.instance.setClearAlpha(this.app.world.Enviromet.params.alpha)
                        }
                    })
                    
                }
            },'<')
            .to(this.app.nomad.scene.scale, {
                x: .1, y: .1, z: .1,
                ease: 'power4.out',
                duration: 3
            }, '<')
            .to(this.app.camera.instance.position, {
                x:-1.27256, y:3.39687, z:3.93120,
                duration: 3.5,

            }, '-=2.8')
            .to(this.app.camera.controls.target, {
                x: this.app.ship.position.x, y: this.app.ship.position.y, z: this.app.ship.position.z,
                duration: 2,
            }, '-=.5')


        const nomT1 = gsap.timeline({
            yoyo: true,
            repeat: -1,
            repeatDelay: 3.2,
            paused: true
        })

        nomT1   
            .to(this.bones.head.rotation, {
               x: -0.1191,
                y: -0.3471,
                z: -0.0051,
                duration: 5.5,
                ease: 'power3.inOut'
            })
            .to(this.bones.head.rotation, {
                x: -0.0963,
                y: 0.48657,
                z: -0.2559,
                duration: 6,
                ease: 'power2.inOut'
            })
            .to(this.bones.head.rotation, {
                x: -0.0507,
                y: -0.1191,
                z: 0.08610,
                duration: 7,
                ease: 'power4.inOut'
            })
        this.master = gsap.timeline()
        this.master
            .add(t1)
            // .add(nomT1)
            .add(t3, '+=5')

    }

}
