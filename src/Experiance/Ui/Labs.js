import LabsCards from "../../assets/labsCards";
import "../Styles/Labs.css"

export default class Labs{
    constructor(root, ui){
        this.container = root
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
                        <div class="wo-am">
                            <div class="wo-spacer">
                                <svg width="988" height="120" viewBox="0 0 988 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M60 10L110 60L60 110L10 60L60 10Z" fill="#FFFEFE"/>
                                    <path d="M119.293 60L60 119.293L0.707031 60L60 0.707031L119.293 60Z" stroke="white"/>
                                    <path d="M928 10L978 60L928 110L878 60L928 10Z" fill="white"/>
                                    <path d="M987.293 60L928 119.293L868.707 60L928 0.707031L987.293 60Z" stroke="white"/>
                                    <path d="M266 10L316 60L266 110L216 60L266 10Z" fill="white"/>
                                    <path d="M712 10L762 60L712 110L662 60L712 10Z" fill="white"/>
                                    <path d="M489 10L539 60L489 110L439 60L489 10Z" fill="white"/>
                                    <path d="M60 60H928" stroke="white"/>
                                </svg>
                            </div>
                        </div>
                        <div class="sliders">
                        </div>
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