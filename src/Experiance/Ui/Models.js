import ModelCards from "../../assets/modelCards";
import '../Styles/Models.css'
import { modSvg } from "../../assets/secIcons";

export default class Models{
    constructor(root, ui, device, resources){
        this.container = root
        this.device = device
        this.modelCard = ModelCards(resources)

        this.setParent()
        this.setInstance();

    }
    setParent(){
        parent = document.createElement('section')
        parent.id = "models" 
        parent.classList.add('page')
        parent.innerHTML= `
                        <div class="intro-header header-mod"> 
                            <div class="title-cont">
                                <h1>Models</h1>
                                <p>Ideas, Experiments, Tweeks</p>
                            </div>
                        </div>
                        <div class="slide-wrapper"> 
                            <div class="slider slider-mod " base="${this.device.mobile? 1: 3 }" >
                            
                                <div class="sliders">
                                </div>
                                <div class="wo-am"> 
                                        <div class="wo-spacer"> 
                                            ${modSvg}
                                        </div>
                                    </div>
                            </div>
                        <div>
            `;
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-mod .sliders');
        let injectElement = this.modelCard.map( (d, i) => {
            console.log(`foo i`,i)
            return ` <div class="slider-cont sli-${i}">
            ${i == 0 ? `<div class="s-name"> <h2>  something </h2> </div>`: ""}
    
            ${i !==0 && i < this.modelCard.length -1 ?` 
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
                    `: ""}
            ${i == this.modelCard.length -1 ? `<div class="s-name"> <h2>  something </h2> </div>`: ""}
        </div>`
        }).join('');
        projectElement.innerHTML = injectElement;
    }

}