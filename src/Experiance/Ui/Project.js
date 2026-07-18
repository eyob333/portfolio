import '../Styles/Projects.css'
import projects from "../../assets/porojectCards";

export default class Project{
    constructor(root){
        this.container = root
        this.array = projects;
        this.setParent()
        this.setInstance();

    }
    setParent(){
        parent = document.createElement('section')
        parent.id = "project" 
        parent.classList.add('page')
        // parent.classList.add('project')
        parent.innerHTML= `
                        <div class="intro-header header-proj"> 
                            <h1>Projects</h1>
                            <p>Ideas, Experiments, Tweeks</p>
                        </div>
                        <div class="slider slider-proj">
                            <div class="wo-info"> 
                                <div class="wo-line"> </div>
                                <div class="wo-am"> <h3>0</h3></div>
                            </div>
                            <div class="sliders">
                            </div>
                        </div>
            `;
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-proj .sliders');
        let injectElement = this.array.map( (d, i) => `
        
            <div class="slider-cont i-${i}"> 
                <span class="s-empty"> </span>
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
                                ${d.desc.map( d =>`
                                    <p>${d}</p>
                                    `).join('')
                                }
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

}