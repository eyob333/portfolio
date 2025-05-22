
export class Injector{
    constructor(array, element){
        this.array = array;
        this.element = element;
        this.intial(array);

    }
    intial(array){
        this.injectElement = array.map( d => `<div class="projects-card-container">
            <div class="card">
            <h2>${d.name}</h2>
            <i class="fas fa-arrow-right"></i>
            <p>a lonely trip.</p>
                    
            <div class="pic" style="background-image: url('${d.img}');"></div>
                    
            <div class="social">
                <i class="fab fa-twitter">Role</i>
                <i class="fab fa-facebook-f"> > ${d.role}</i>
                <i class="fab fa-instagram">li</i>
                <i class="fab fa-github">s</i>
            </div>
                <button>more</button>
            </div>
        </div>
    `).join('');

        this.element.innerHTML = this.injectElement;
    }
    

}