import LabsCards from "../../assets/labsCards";

export default class Labs{
    constructor(){
        this.labsElement = document.querySelector('div.Labs-container');
        this.array = LabsCards;
        this.instance();
    }
    instance(){
        this.injectElement = this.array.map( d => `<div class="projects-card-container">
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
        this.labsElement.innerHTML = this.injectElement;
        
    }
}