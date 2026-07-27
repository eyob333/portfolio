import ModelCards from "../../assets/modelCards";
import '../Styles/Models.css'
export default class Models{
    constructor(root){
        this.container = root
        this.array = ModelCards;
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
        let injectElement = this.array.map( (d, i) => `
            <div class="slider-cont sli-${i}"> 
                <span class="empty"> </span>
                <div class="side-m"> 
                    <div class="s-image">
                        <img src="${d.img}" />
                    </div>
                    <div class="s-disc">
                        <div class="s-line">
                        </div>
                        <div class="s-det"> 
                            <div class="s-index">
                                <p>0${i}</p>
                            </div>
                            <div class="s-name"> 
                                <h2> ${d.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`).join('');
        projectElement.innerHTML = injectElement;
    }

    Inject(){
        
    }

}