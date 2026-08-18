import '../Styles/Projects.css'
import projects from "../../assets/porojectCards";

export default class Project{
    constructor(root, ui){
        this.container = root
        this.setParent()
        this.setInstance();

        if(ui){
            this.debug = ui.addFolder('project')
        }

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
                            <div class="slider slider-proj">
                                    <div class="wo-am">
                                        <div class="wo-spacer">
                                            <svg width="990" height="113" viewBox="0 0 990 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.2335 55.7996H970.233" stroke="white"/>
                                                <path d="M11.2335 59.6028L80.2335 59.6028V99.6028L11.2335 59.6028Z" fill="#D9D9D9"/>
                                                <path d="M11.2335 52.6028L80.2335 12.7995V52.6028L11.2335 52.6028Z" fill="#D9D9D9"/>
                                                <path d="M11.2335 59.6028L80.2335 59.6028V99.6028L11.2335 59.6028Z" fill="white"/>
                                                <path d="M11.2335 52.6028L80.2335 12.7995V52.6028L11.2335 52.6028Z" fill="white"/>
                                                <path d="M232.233 59.7089L301.233 59.7089V99.7996L232.233 59.7089Z" fill="white"/>
                                                <path d="M232.233 52.693L301.233 12.7996V52.693L232.233 52.693Z" fill="white"/>
                                                <path d="M979.233 52.7996L910.233 52.7996V12.7996L979.233 52.7996Z" fill="white"/>
                                                <path d="M979.233 59.7996L910.233 99.6028V59.7996L979.233 59.7996Z" fill="white"/>
                                                <path d="M747.233 52.7996L678.233 52.7996V12.7996L747.233 52.7996Z" fill="white"/>
                                                <path d="M747.233 59.7996L678.233 99.6028V59.7996L747.233 59.7996Z" fill="white"/>
                                                <path d="M490.233 5.79956L536.233 51.7996H444.233L490.233 5.79956Z" fill="white"/>
                                                <path d="M490.233 105.8L444.233 59.7996H536.233L490.233 105.8Z" fill="white"/>
                                                <path d="M87.2335 51.2471C87.2335 31.5461 87.2335 20.5005 87.2335 0.799561L0.233482 51.7996" stroke="white" stroke-width="0.9"/>
                                                <path d="M86.7335 58.7996V111.3L0.233482 58.7996" stroke="white" stroke-width="0.9"/>
                                                <path d="M902.233 60.8521C902.233 80.553 902.233 91.5986 902.233 111.3L989.233 60.2996" stroke="white" stroke-width="0.9"/>
                                                <path d="M902.733 53.2996V0.799566L989.233 53.2996" stroke="white" stroke-width="0.9"/>
                                            </svg>
                                        </div>
                                    </div>
                                <div class="sliders">
                                </div>
                            </div>
                        </div>
                        
            `;
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-proj .sliders');
        let injectElement = projects.map( (d, i) => `
        
            <div class="slider-cont i-${i}"> 
                <div class="cont-frac"> 
                    <div class="s-video">    
                        <video autoplay muted loop >
                            <source src="${d.vid}" type="video/mp4">
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


            </div>`).join('');
        projectElement.innerHTML += injectElement;
    }

    setDebug(){

    }

}