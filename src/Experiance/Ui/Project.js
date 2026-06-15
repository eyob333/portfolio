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
                            <div class="sliders">
                            </div>
                        </div>
            `;
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-proj .sliders');
        let i = 0;
        let injectElement = this.array.map( d => `
            <!-- ${i++} -->
            <div class="slider-cont i-${i} ${i>3 ? 'tab-overflow':''}"> 
                
                <div class="s-name" > 
                    <h2> ${d.name}</h2>
                </div>
            </div>`).join('');
        projectElement.innerHTML = injectElement;
    }

}