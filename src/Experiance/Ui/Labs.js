import LabsCards from "../../assets/labsCards";
import "../Styles/Labs.css"

export default class Labs{
    constructor(root){
        this.container = root
        this.array = LabsCards;
        this.setParent()
        this.setInstance()
    }
    setParent(){
        let parent = document.createElement('section')
        parent.id = 'labs'
        parent.classList.add('page')
        parent.innerHTML =  `
                <div class="intro-header header-labs">
                    <div class="title-cont">  
                        <h1>Labs </h1>
                        <p>Ideas, Experiments, Tweeks</p>
                    </div> 
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
        let i=0
        let injectElement = this.array.map( (d,j) => `
            <div class="slider-cont i-${j}"> 
                <div class="cont-frac"> 
                    <span class="s-empty"> 
                    </span>
                    <div class="s-vis"> 
                        <div class="s-image"> 
                            <img src="${d.img}" >
                        </div>
                        <div class="s-icon"> 
                            ${d.icon.map( k =>`
                                <div class='icon-cont'> 
                                    ${k.svg}
                                </div>
                                `)}
                        </div> 
                    </div>
                    <div class="s-desc"> 
                        <div class="s-name">
                            <h2>${d.name}</h2>
                        </div>
                    </div>
                </div>
            </div>`).join('');
        element.innerHTML = injectElement;
        
    }
}