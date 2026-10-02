import '../Styles/Projects.css'
import projectsC from "../../assets/porojectCards";
import { proSvg } from '../../assets/secIcons';

export default class Project{
    constructor(root, ui, device, resouces){
        this.container = root
        this.device = device
        this.projCards = projectsC(resouces)

        this.setParent()
        this.setInstance();

        if(ui){
            this.debug = ui.addFolder('project')
        }

        console.log(device)

    }
    setParent(){
        parent = document.createElement('section')
        parent.id = "project" 
        parent.classList.add('page')
        // parent.classList.add('project')
        parent.innerHTML= `
                        <div class="intro-header header-proj"> 
                            <div class="title-cont"> 
                                <h1>Projects</h1>
                                <p>Ideas, Experiments, Tweeks</p>
                            </div>
                        </div>
                        <div class="slide-wrapper"> 
                            <div class="slider slider-proj" base="1">

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
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-proj .sliders');
        let injectElement = this.projCards.map( (d, i) => `
        
            <div class="slider-cont i-${i}"> 
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
                    <!-- <span class="s-empty"> </span> -->

                </div>
            </div>`).join('');
        projectElement.innerHTML += injectElement;
    }

    setDebug(){

    }

}