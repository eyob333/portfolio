import projects from "../../assets/porojectCards";

export default class Models{
    constructor(root){
        this.container = root
        this.array = projects;
        this.setParent()
        this.setInstance();

    }
    setParent(){
        parent = document.createElement('section')
        parent.id = "models" 
        parent.classList.add('page')
        // parent.classList.add('project')
        parent.innerHTML= `
                        <div class="intro-header header-mod"> 
                            <h1>Models</h1>
                            <p>Ideas, Experiments, Tweeks</p>
                        </div>
                        <div class="slider slider-mod">
                            <div class="sliders">
                            </div>
                        </div>
            `;
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-mod .sliders');
        let i=1
        let injectElement = this.array.map( (d) => `
            <div class="slider-cont sli-${}"> 
                <div class="s-name"> 
                    <h2> ${d.name}</h2>
                </div>
            </div>`).join('');
        projectElement.innerHTML = injectElement;
    }

    Inject(){
        
    }

}