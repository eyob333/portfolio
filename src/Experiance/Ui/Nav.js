import '../Styles/Nav.css'
import ContactIcons from "../../assets/contactIcons";
import navIcon from "../../assets/navIcon";


export default class Nav{
    constructor(root, ui){
        this.container = root
        this.setInstance();

        if(ui){
            this.debug = ui.addFolder('nav')
        }
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
                       <svg width="255" height="255" viewBox="0 0 255 255" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M131 0.0471115C199.798 1.90131 255 58.2541 255 127.5C255 196.746 199.798 253.099 131 254.953L131 0.0471115Z" fill="#2B323F"/>
                        <path d="M124 0V254.906C55.2018 253.052 0 196.699 0 127.453C0 58.207 55.2018 1.85419 124 0Z" fill="#F3F0E7"/>
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
            <div class="nav-mask ${d.text}-nav-to">
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
            <div class="icons icons-s soc-li ${d.name}" data-link="${d.link}">
                ${d.icon}
            </div>
            `).join('')
        socialI.innerHTML = injectSocial;
    }

    setDebug(){
        this.theme = this.debug.addFolder("theme")

    }
}