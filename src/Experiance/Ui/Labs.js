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
        parent.id = 'page3'
        parent.classList.add('page')
        parent.classList.add('labs')
        parent.innerHTML =  `
                <h1>Labs </h1>
                <p>Ideas, Experiments, Tweeks</p>
                <div class="slider-wrapper">
                <div class="Labs-container project-container">
                    </div>
                </div>
            `;
        this.container.appendChild(parent)
    }

    setInstance(){
        let element = document.querySelector('div.Labs-container');
        let injectElement = this.array.map( d => `<div class="projects-card-container">
                <div class="card">
                    <h2 ${d.mainTextC ?  `style="color:${d.mainTextC}"`: ''} >${d.name}</h2>
                    <i class="fas fa-arrow-right"></i>
                                
                    <div class="pic" style="background-image: url('${d.img}');"></div>
                                
                    <div class="social">
                        <i class="fab role" ${d.upTextC ?  `style="color: ${d.upTextC}"`: ''} >Role</i>
                        <i class="fab roleT" ${d.upTextC ?  `style="color: ${d.upTextC}"`: ''} > ${d.role}</i>

                    </div>
                        <button onclick="location.href='${d.link}'">more</button>
                </div>
            </div>`).join('');
        element.innerHTML = injectElement;
        
    }
}