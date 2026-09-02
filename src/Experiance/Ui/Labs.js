import LabsCards from "../../assets/labsCards";
import "../Styles/Labs.css"
import { labSvg } from "../../assets/secIcons";

export default class Labs{
    constructor(root, ui, device){
        this.container = root
        this.device = device
        this.setParent()
        this.setInstance()

        if(ui){
            this.debug = ui.addFolder('lab')
        }
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
                <div class="slide-wrapper">  
                    <div class="slider slider-lab">
                     ${ !this.device.mobile ? `
                        <div class="wo-am">
                            <div class="wo-spacer">
                                ${labSvg}
                            </div>
                        </div>
                        ` : ""}

                        <div class="sliders">
                        </div>

                        ${ this.device.mobile ? `
                            <div class="wo-am">
                                <div class="wo-spacer">
                                    ${labSvg}
                                </div>
                            </div>
                        ` : ""}


                    </div>
                 </div>
            `;
        this.container.appendChild(parent)
    }

    setInstance(){
        let element = document.querySelector('div.slider-lab .sliders');
        console.log("foo end",LabsCards.length)
        let injectElement = LabsCards.map( (d,i) => {
        return `<div class="slider-cont sli-${i}"> 
            ${i == 0 ? `<div> something </div>`: `` }
            ${ i !==0 && i < LabsCards.length-1 ? ` <div class="slider-cont sli-${i}"> 
                    <div class="side-m"> 
                        <div class="s-vis">
                            <div class="s-image">
                                <img src="${d.img}" />
                            </div>
                            <div class="s-icon"> 
                                ${d.icon.map( k =>`
                                    <div class='icon-cont'> 
                                            ${k.svg}
                                    </div>`).join('')}
                            </div> 
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
                </div> `: ``}
                                    

            ${i == LabsCards.length-1  ? `<div> something else </div>`: ""} 
        </div>`
        
    }).join('')
            

        element.innerHTML = injectElement;
        
    }
}