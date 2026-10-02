import LabsCards from "../../assets/labsCards";
import "../Styles/Labs.css"
import { labSvg } from "../../assets/secIcons";

export default class Labs{
    constructor(root, ui, device, resources){
        this.container = root
        this.device = device        
        this.labC = LabsCards(resources)
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
                    <div class="slider slider-lab" base="3" >

                        <div class="sliders">
                        </div>

                            <div class="wo-am">
                                <div class="wo-spacer">
                                    ${labSvg}
                                </div>
                            </div>


                    </div>
                 </div>
            `;
        this.container.appendChild(parent)
    }

    setInstance(){
        let element = document.querySelector('div.slider-lab .sliders');
        console.log("foo end",this.labC.length)
        let injectElement = this.labC.map( (d,i) => {
        return `<div class="slider-cont sli-${i}"> 
            ${i == 0 ? `<div class="side-m" > something </div>`: `` }
            ${ i !==0 && i < this.labC.length -1 ? `
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
                `: ``}
                                    

            ${i == this.labC.length -1 ? `<div class="side-m" > something else </div>`: ""} 
        </div>`
        
    }).join('')
            

        element.innerHTML = injectElement;
        
    }
}