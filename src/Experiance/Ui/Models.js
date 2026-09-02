import ModelCards from "../../assets/modelCards";
import '../Styles/Models.css'
import { modSvg } from "../../assets/secIcons";

export default class Models{
    constructor(root, ui, device){
        this.container = root
        this.device = device

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
                            <div class="slider slider-mod">

                                
                            ${ !this.device.mobile ? `
                                    <div class="wo-am"> 
                                        <div class="wo-spacer"> 
                                            ${modSvg}
                                        </div>
                                    </div>
                                ` : ""}

                            <div class="sliders">
                            </div>


                            ${ this.device.mobile ? `
                                <div class="wo-am"> 
                                        <div class="wo-spacer"> 
                                            ${modSvg}
                                        </div>
                                    </div>
                                ` : ""}
                            </div>
                        <div>
            `;
        this.container.appendChild(parent)
    }
    setInstance(){
        let projectElement = document.querySelector('div.slider-mod .sliders');
        let injectElement = ModelCards.map( (d, i) => {
            return ` <div class="slider-cont sli-${i}">
            ${i == 0 ? `<div> something </div>`: ""}
    
            ${i !==0 && i < ModelCards.length-1 ?`
                    <div class="slider-cont sli-${i}"> 
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
                    </div>`: ""}
            ${i == ModelCards.length -1 ? `<div> something else</div>`: ""}
        </div>`
        }).join('');
        projectElement.innerHTML = injectElement;
    }

}