




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
                <div class="theme">
                    <svg viewBox="0 0 85 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M81 1.5C81.0671 1.5 81.1341 1.49984 81.2012 1.5L82.9053 159.477C82.272 159.491 81.6369 159.5 81 159.5C37.0846 159.5 1.5 124.122 1.5 80.5C1.5 36.8782 37.0846 1.5 81 1.5Z" fill="white" stroke="#F9F3F3" stroke-width="3"/>
                    </svg>
                </div>

            </div>
            <div class="nav">
                <div class="nav-item">
                    <div class="nav-mask">
                        <svg width="42" height="57" viewBox="0 0 42 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 40H2.5V2.5H5.5L39 55" stroke="white" stroke-width="5"/>
                        </svg>
                    </div>

                    <div class="nav-mask">
                        <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 41H2.5V19H29V0" stroke="white" stroke-width="5"/>
                        </svg>
                    </div>

                    <div class="nav-mask">
                        <svg width="42" height="57" viewBox="0 0 42 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 40H2.5V2.5H5.5L39 55" stroke="white" stroke-width="5"/>
                        </svg>
                    </div>

                    <div class="nav-mask">
                        <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 41H2.5V19H29V0" stroke="white" stroke-width="5"/>
                        </svg>
                    </div>
                    
                    <div class="nav-mask">
                        <svg width="42" height="57" viewBox="0 0 42 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 40H2.5V2.5H5.5L39 55" stroke="white" stroke-width="5"/>
                        </svg>
                    </div>

                    <div class="nav-mask">
                        <svg width="32" height="44" viewBox="0 0 32 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 41H2.5V19H29V0" stroke="white" stroke-width="5"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
        this.container.appendChild(element);
    }
}