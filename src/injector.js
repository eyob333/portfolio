
class Injector{
    constructor(array, element, type){
        this.array = array;
        this.element = element;
        this.type = type;
        this.intial(array);
    }
    intial(){
        if (this.type == 'element'){
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
            this.element.innerHTML = this.injectElement;
        }
        else if (this.type == 'icon'){
            this.injectElement = this.array.map( d => ` <button onclick="location.href='${d.link}'" type="button"class="contact-icons  ${d.name == 'email' && `last`}">
                    ${d.icon} ${d.name == 'email' ?  `<p>${d.acc}</p>`: ''}
                </button>`).join('');
            this.element.innerHTML = this.injectElement;
        }

    }
}

export {Injector}