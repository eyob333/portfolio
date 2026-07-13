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
                                <div class="wo-am"> <h3>0%</h3></div>
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
                <span class="emptyj"> </span>
                <div class="cont-frac"> 
                    <div class="s-video">   
                        <video autoplay muted loop >
                            <source src="${d.vid}" type="video/mp4">
                        </video> 

                    </div>

                    <div class="s-icon"> 
                        ${d.rid.map( v => `
                            <div class="mo-ic"> 
                                ${v.svg}
                            </div>`).join('')}
                    </div>

                </div>

                <div class="s-title" > 
                    <h2> ${d.name}</h2>
                </div>


            </div>`).join('');
        projectElement.innerHTML += injectElement;
    }

}