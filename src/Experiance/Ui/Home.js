import icons from "../../assets/techStackIcons";



export default class Home{

    constructor(root){
        this.container = root
        this.setInstance();
    }

    setInstance(){
        let element = document.createElement('section');
        element.id = 'home';
        element.classList.add('page');
        element.innerHTML = `
            <div class="header-home sec">
                <div class="heading-cont" >
                    <h1>winter nomad</h1>
                </div>
                <div class="subhead-cont">
                    <span> </span>
                    <div class="mask">
                        <h4 class="primary">Software Engnieer</h4>
                        <h4 class="secondary">Fullstack Developer</h4>
                        <h4 class="teritiary">Shader Artist</h4> 
                        <h4 class="fourth">Createive Developer</h4>
                    </div>
                 </div>
            </div>

            <div class="slider-hom sec"> 
                <div class="slide-hom">
                    <div class="slide abt a1" >
                        <div class="detail-cont">
                            <p>
                                Hi, <strong>Winter-Nomad</strong>, a software engineer, web developer and musician based in Ethiopia.
                                <br>
                                <br>
                                I specialize in JavaScript, Python, C/C++, GLSL, Java and Go, and build scalable web apps using React, Three.js, Vite, and Express. 
                                My work spans responsive sites, real-time 3D, backend systems, and low-level software.
                                <br>
                            </p>
                        </div>
                    </div> 

                    <div class="slide abt a2">
                        <div class="detail-cont">
                            <p>
                                <br>
                                Currently, I'm deepening my understanding of databases—focusing on data modeling, performance, and architecture. 
                                I love solving complex problems and turning ideas into efficient, high-impact solutions.
                                <br> 
                                <br> 
                                Outside of coding, 
                                I play lead guitar, participate in Jam sessions and contribute to innovative projects.
                                <strong>“Make it work, make it right, make it fast.” – Kent Beck</strong>
                            </p> 
                        </div>
                    </div>
                            
                    <div class="slide tech"> 
                        <div class="title-cont"> 
                            <h2>Techstack</h2>
                        </div>
                        <div class="icon-cont"> 
                        </div>
                    </div>   
                </div>   
            </div>



        `;

        this.container.appendChild(element);


        let techE =document.querySelector('.icon-cont');
        techE.innerHTML = icons.map(icon => `
          <div class="icon tech-i">
            <div class="svg-cont">
                ${icon.svg}
            </div>
            <div class="icon-name">
                <p>${icon.name}</p>
            </div>
          </div>
        `).join('')
    }
          
}