import projects from "../../assets/porojectCards";


export default class Project{
    constructor(array, element, type){
        this.projectElement = document.querySelector('div.project-container');
        this.array = projects;
        this.setInstance();
        this.parent = `
                <section id="page1" class="page project">
                    <h1>Projects</h1>
                    <div class="slider-wrapper">
                        <div class="project-container">
                        </div>
                    </div>
                </section>
            `;
    }
    setInstance(){
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
        this.projectElement.innerHTML = this.injectElement;
    }

    Inject(){
        
    }

}