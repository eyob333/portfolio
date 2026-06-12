import LabsCards from "../../assets/labsCards";

export default class Labs{
    constructor(root){
        this.container = root
        this.array = LabsCards;
        this.setParent()
        this.setInstance()
    }
    setParent(){
        let parent = document.createElement('section')
        parent.id = 'lab'
        parent.classList.add('page')
        // parent.classList.add('labs')
        parent.innerHTML =  `
                <div class="intro-header header-labs">  
                    <h1>Labs </h1>
                    <p>Ideas, Experiments, Tweeks</p>
                </div>
                <div class="slider slider-lab">
                    <div class="sliders">
                    </div>
                </div>
            `;
        this.container.appendChild(parent)
    }

    setInstance(){
        let element = document.querySelector('div.slider-lab .sliders');
        let injectElement = this.array.map( d => `
            <div class="slider-cont">
                <div class="s-name">
                    <h2>${d.name}</h2>
                </div>
            </div>`).join('');
        element.innerHTML = injectElement;
        
    }
}