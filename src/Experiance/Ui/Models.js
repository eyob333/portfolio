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
                            <div class="title-cont">
                                <h1>Models</h1>
                                <p>Ideas, Experiments, Tweeks</p>
                            </div>
                        </div>
                        <div class="slider slider-mod">
                            <div class="wo-am"> 
                                <div class="wo-spacer"> 
                                    <svg width="972" height="90" viewBox="0 0 972 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M85.7369 79.5H18.1861L51.9615 20.999L85.7369 79.5Z" fill="#FFFCFC" stroke="white" stroke-width="11"/>
                                        <path d="M103.057 89.5H0.865822L51.9615 0.999023L103.057 89.5Z" stroke="white"/>
                                        <path d="M953.737 79.5H886.186L919.962 20.999L953.737 79.5Z" fill="#FFFCFC" stroke="white" stroke-width="11"/>
                                        <path d="M284.737 79.5H217.186L250.962 20.999L284.737 79.5Z" fill="#FFFCFC" stroke="white" stroke-width="11"/>
                                        <path d="M730.737 79.5H663.186L696.962 20.999L730.737 79.5Z" fill="#FFFCFC" stroke="white" stroke-width="11"/>
                                        <path d="M507.737 79.5H440.186L473.962 20.999L507.737 79.5Z" fill="#FFFCFC" stroke="white" stroke-width="11"/>
                                        <path d="M971.057 89.5H868.866L919.962 0.999023L971.057 89.5Z" stroke="white"/>
                                        <path d="M51.4615 54.5H918.962" stroke="#F2F2F2"/>
                                    </svg>
                                </div>

                            </div>
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