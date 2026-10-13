import '../Styles/Projects.css'
import projectsC from "../../assets/porojectCards";
import { proSvg } from '../../assets/secIcons';
import { theme } from '../../assets/config';
import gsap from 'gsap';

export default class Project{
    constructor(root, ui, device, resouces){
        this.container = root
        this.device = device
        this.projCards = projectsC(resouces)

        this.setParent()
        this.setInstance();

        if(ui){
            this.debug = ui.addFolder('project')
                //.close;
            this.setDebug();
        }

    }
    setParent(){
        this.parent = document.createElement('section')
        this.parent.id = "project" 
        this.parent.classList.add('page')
        // parent.classList.add('project')
        this.parent.innerHTML= `
                        <div class="intro-header header-proj"> 
                            <div class="title-cont"> 
                                <h1>Projects</h1>
                                <p>Ideas, Experiments, Tweeks</p>
                            </div>
                        </div>
                        <div class="slide-wrapper"> 
                            <div class="slider slider-proj projf" base="1">

                                <div class="sliders">
                                </div>

                                <div class="wo-am">
                                    <div class="wo-spacer">
                                        ${proSvg}
                                    </div>
                                </div>

                            </div>
                        </div>
                        
            `;
        this.container.appendChild(this.parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-proj .sliders');
        let injectElement = this.projCards.map( (d, i) => `
        
            <div class="slider-cont i-${i} proj-e"> 
                <div class="frac-wrap">   
                    <div class="cont-frac"> 
                        <div class="s-video" onmouseenter="this.querySelector('video').play()" onmouseleave="this.querySelector('video').pause()">
                            <video poster="${d.thum}" muted playsinline webkit-playsinline loop preload="auto">
                                <source src="${d.vid.src}" type="video/mp4">
                            </video> 
                        </div>

                        <div class="s-desc"> 
                            <div class="icons"> 
                                ${d.rid.map( v => `
                                    <div class="icon"> 
                                        ${v.svg}
                                    </div>`).join('')
                                }
                            </div>
                            
                            <div class="desc"> 
                                <div class="dec-item">
                                    <p>
                                        ${d.desc.map( d =>`
                                            <p>${d}</p>
                                            `).join('')
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="s-title" > 
                        <span class="empty"> </span>
                        <div class="frac-cont"> 
                            <h2> ${d.name}</h2>
                            <div class="title-line"> </div>
                        </div>
                    </div>
                   
                </div>
            </div>`).join('');
        projectElement.innerHTML += injectElement;
    }

    cardCount(){
        return this.projCards;
    }

    setDebug(){
        
        const sg = this.parent.querySelector('.form-wrapper');
        const formHed = this.parent.querySelector('.text-cont .subhead-cont')
        const inputTex = this.parent.querySelector('.text-cont .subhead-cont')
        const formIco = this.parent.querySelector('.text-cont .subhead-cont')


        this.debug.add(theme, 'contFormPosX').name('form-wrap-x').min(-300).max(40).step(.1).onChange( () =>{gsap.set(sg, {x: theme.contFormPosX})});
        this.debug.add(theme, 'contFormPosY').name('form-wrap-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(sg, {y: theme.contFormPosY})});
    }

}