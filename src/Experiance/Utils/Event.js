import EventEmitter from "./EventEmitter"

export default class Event extends EventEmitter{
    constructor(){
        super()
        
        // this.width = window.innerWidth
        // this.height = window.innerHeight
        // this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // window.addEventListener('resize', () => {
        //     this.width = window.innerWidth
        //     this.height = window.innerHeight
        //     this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            
        //     this.trigger('resize')
        // })

        this.count = 0;
        this.maxCount = 15;

        window.addEventListener('keypress', e =>{
            switch(e.key.toLocaleLowerCase()) {
                case 'w':
                case 'a':
                case 's':
                case 'd':
                    if (this.maxCount >= this.count) {
                        this.key = e.key.toLocaleLowerCase()
                        console.log("triggred event", e)
                        this.count += 1;
                        this.trigger("keyPress")
                    }
                    break;
            }
            
        } )

        // window.addEventListener('mousemove', e =>{
        //     this.trigger("mouseMove")
        // })

    }
}