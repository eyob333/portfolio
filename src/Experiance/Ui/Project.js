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
                .close;
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
        
        const title = this.parent.querySelectorAll('.slide-wrapper h2');
        const para = this.parent.querySelectorAll('.slide-wrapper .dec-item p')
        const vid = this.parent.querySelectorAll('.slide-wrapper .s-video')
        const icon = this.parent.querySelectorAll('.slide-wrapper .icon svg')

        this.debug.add(theme, 'projVidPosX').name('vid-pos-x').min(-300).max(300).step(.1).onChange( () =>{gsap.set(vid, {x: theme.projVidPosX})});
        this.debug.add(theme, 'projVidPosY').name('vid-pos-y').min(-300).max(300).step(.1).onChange( () =>{gsap.set(vid, {y: theme.projVidPosY})});

        this.debug.add(theme, 'projTitFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('title-font-family').onChange( () =>{gsap.set( title, { fontFamily: theme.projTitFontFam })} ); 
        this.debug.add(theme, 'projTitFontSize').name('title-font-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set( title, { fontSize: `${theme.projTitFontSize}rem`})} );
        this.debug.add(theme, 'projTitFontWeig').name('title-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( title, { fontWeight: theme.projTitFontWeig})} );
        this.debug.add(theme, 'projTitPosX').name('title-pos-x').min(-300).max(300).step(.1).onChange( () =>{gsap.set( title, {x: theme.projTitPosX})});
        this.debug.add(theme, 'projTitPosY').name('title-pos-y').min(-300).max(300).step(.1).onChange( () =>{gsap.set( title, {y: theme.projTitPosY})});

        this.debug.add(theme, 'projParaFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('para-font-family').onChange( () =>{gsap.set( para, { fontFamily: theme.projParaFontFam })} ); 
        this.debug.add(theme, 'projParaFontSize').name('para-font-size').min(0.3).max(12).step(.01).onChange( () =>{gsap.set( para, { fontSize: `${theme.projParaFontSize}rem`})} );
        this.debug.add(theme, 'projParaFontWeig').name('para-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( para, { fontWeight: theme.projParaFontWeig})} );
        
        this.debug.add(theme, 'projIconWidth').name('icon-width').min(0).max(100).step(.1).onChange( () =>{gsap.set(icon, {width: theme.projIconWidth})});
        this.debug.add(theme, 'projIconHeight').name('icon-height').min(0).max(100).step(.1).onChange( () =>{gsap.set(icon, {height: theme.projIconHeight})});

    }

}