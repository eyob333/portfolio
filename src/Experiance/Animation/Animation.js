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

       let cA = gsap.timeline()
       let remap = null;


        // this.event.on('keyPress', () => {
            
        //     switch (this.event.key){
        //         case 'a':
        //             cA.kill(); 
        //             remap = -1.5 * (this.event.count / this.event.maxCount);
        //             cA = gsap.timeline()
        //             cA.to( this.app.ship.rotation, {
        //                 z: remap,
        //                 reversed: true,
        //                 // onComplete: () =>{
        //                 //     // gsap.to ( this.app.ship.rotation, {
        //                 //     //     z: 0,
        //                 //     //     overwrite
        //                 //     // })
        //                 // }
        //             })
        //             console.log("foo cout", this.event.count , this.event.maxCount, -this.event.count/this.event.maxCount)
        //             break;
        //     }
        //     console.log("yup", this.event.key)
        // })
        // this.event.off('keyPress', () =>{
        //     console.log("this is off key press")
        // })


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
                onStart: () =>{
                    this.app.ship.visible = false
                    this.app.world.Cockpit.instance.visible = false
                    this.app.world.Station.instance.visible = false
                    this.app.world.Particle.instance.visible = false
                    this.app.world.Hangar.instance.visible = false
                },
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
                    // this.app.scene.add(this.app.ship)
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
                    this.app.world.Nomad.pod.scene.visibility = false
                    // this.app.scene.add( this.app.world.Cockpit.instance)
                    this.app.world.Cockpit.instance.visible =true
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
            .to(this.overlay.material.uniforms.uAlpha, {
                value: 1,
                duration: 1.5,
                onStart: () =>{
                    this.app.ship.visible = false
                },
                onComplete: () =>{
                    this.app.world.Cockpit.instance.rotation.y = Math.PI
                    this.app.world.Cockpit.instance.position.set(4, 0, 3)
                }
            }, '<')
            .to(this.overlay.material.uniforms.uAlpha, {
                value: 0,
                duration: 1,
                onStart: () =>{
                    this.app.camera.instance.position.set(4.00314,-0.1449,3.27645)
                    // this.app.world.Particle.instance.layers.set(0)
                    this.app.camera.controls.target.copy(this.app.world.Cockpit.instance.position)                    
                    gsap.to(this.app.camera.controls.target, {
                        y: -.13,
                        z: 3.21,
                        duration: 1.4
                    })
                    this.app.ship.visible = false
                },
                
            })


            const t4 = gsap.timeline()

            t4
                .to(this.overlay.material.uniforms.uAlpha, {
                    duration: 1,
                    value: 1.3, 
                    onComplete: () =>{
                       this.app.camera.controls.target.copy(this.app.ship.position) 
                       gsap.to( this.app.camera.instance.position, {
                        x: -3.6886066371413606, y:4.48666707896768, z: 5.34525,
                        duration: 1,
                       })   
                       this.app.world.Cockpit.instance.visibility = false
                    }
                
                })
                .to(this.app.ship.position, { y: 1})
                .to(this.app.ship.rotation, {x:-.2, y: .557, z:0,
                    onStart: () =>{
                        this.app.world.Hangar.instance.visible = true
                        this.app.ship.visible = true

                    }
                 }, '<', )                
                 .to(this.overlay.material.uniforms.uAlpha,{
                    value: 0,
                    delay: .5,
                    duration: 1.5,
                    ease: 'power1.in'
                })
                .to(this.app.camera.instance.position,{ 
                    x: 7.685, y: 0.8362, z: 4.1846,
                    duration: 3.5,
                    ease: 'power2.out',
                    onStart: () =>{
                        this.app.camera.controls.target.set(7.009, 0.745, 3.836)
                        // gsap.to(this.app.camera.instance.position,
                        //     { x: 7.685, y: 0.8362, z: 4.1846,
                        //         duration: 3.5,
                        //         ease: 'power2.out'
                        //     })
                    },
                }, '-=1.5')

        const t5 = gsap.timeline({})
        t5
            .to( this.app.ship.rotation, {
                x:0.228, y: Math.PI, z: 0,
                duration: 3,
                onStart: () =>{
                    this.app.camera.controls.target.set(0, 1, 0)
                }
            })
            .to(this.app.ship.position,{
                x: -4, y: 4,
                duration: 3,
                onUpdate: () =>{
                    this.app.camera.controls.target.copy( this.app.ship.position)
                }
            }, '<')
            .to(this.app.camera.instance.position, {
                x: -4.665, y: 5.3846, z: 12.716,
                duration: 5,
                ease: 'power2.inOut'
            }, '<')

            .to(this.app.ship.rotation, {
                x: .04,
                duration: 3,
                onStart: ()=>{
                    this.app.world.Particle.instance.visible = true
                    this.app.world.Hangar.instance.visible = false
                },
                onComplete: () =>{
                    
                }
            })
            .to( this.app.camera.instance.position, {
                x: -4.26165, y: 4.545, z: 5.006,
                duration: 2,
                ease: 'power3.inOut'
            }, '<')
            .to(this.app.world.Particle.uniforms.uSpeed, {
                value: .3,
                delay: 1.3,
                duration: 3,
                ease: 'power4.out'
            }, '<')

            .to (this.app.camera.instance.position, {
                 x: -4.4351, y: 4.906, z: 8.324,
                 duration: 2,
                 ease: 'power1.out'
            }, '-=2.5')

        const t6 =  gsap.timeline({})    
        
        t6
            .to(this.app.world.Particle.instance.scale, {
                x: .5, y: .5, x: .5,
                duration: 4
            })
            .to(this.app.world.Particle.instance.position, {
                z: 100,
                duration: 6,
                onComplete: () =>{
                    this.app.world.Station.instance.visible = true
                    this.app.world.Particle.instance.visible = false
                }
            }, '<')




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
            .add(t4, '+=5')
            .add(t5, '+=5')
            .add(t6, '+=5')

    }

}
