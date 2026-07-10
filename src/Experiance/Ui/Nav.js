import ContactIcons from "../../assets/contactIcons";
import navIcon from "../../assets/navIcon";


export default class Nav{
    constructor(root){
        this.container = root
        this.setInstance();
    }

    setInstance(){
        let element = document.createElement('div');
        element.id = 'nav';
        element.classList.add('stick');
        element.innerHTML = `
            <div class="main-icon"> 
                    <div class="icon-mask">
                        <svg width="246" height="100" viewBox="0 0 246 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="path" d="M138.346 87V5H154.104C156.82 5 159.425 6.07913 161.346 8L242.846 87" stroke="white" stroke-width="9"/>
                            <path  class="path" d="M22.8462 0.5V99.5" stroke="#FFFAFA" stroke-width="8"/>
                            <path  class="path" d="M2.84616 88L81.8462 8L85.7505 4.87653C86.4598 4.30912 87.341 4 88.2493 4H106.346V88" stroke="white" stroke-width="8"/>
                        </svg>
                    </div>
            </div>

            <div class="util"> 
                <div class="social">
                </div>
                <div class="theme">
                    <div class="icons icons-t">
                       <svg width="170" height="162" viewBox="0 0 170 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M81 1.5C81.0671 1.5 81.1341 1.49984 81.2012 1.5L82.9053 159.477C82.272 159.491 81.6369 159.5 81 159.5C37.0846 159.5 1.5 124.122 1.5 80.5C1.5 36.8782 37.0846 1.5 81 1.5Z" fill="white" stroke="#FFFEFE" stroke-width="3"/>
                        <path d="M88.5494 160.083C88.4823 160.083 88.4152 160.083 88.3482 160.083L86.4358 2.10898C87.069 2.09335 87.7041 2.08387 88.341 2.08303C132.256 2.02512 167.888 37.3564 167.945 80.9781C168.003 124.6 132.465 160.025 88.5494 160.083Z" fill="black" stroke="black" stroke-width="3"/>
                        </svg>
                    </div>
                </div>

            </div>

            <div class="nav">
                <div class="nav-item">
            
                </div>
            </div>
        `;
        this.container.appendChild(element);

        let navI = document.querySelector('.nav-item')
        let navInject = navIcon.map( d =>`
            <div class="nav-mask ${d.text}-nav-t">
                <div class="svg-cont"> 
                    ${d.icon}
                 </div>
                <div class="title-cont">
                     <p>${d.text}</p>
                </div>
            </div>
            `).join('')
        navI.innerHTML = navInject;

        let socialI = document.querySelector('.social')
        let injectSocial = ContactIcons.map( d =>`
            <div class="icons icons-s">
                ${d.icon}
            </div>
            `).join('')
        socialI.innerHTML = injectSocial;


    }
}