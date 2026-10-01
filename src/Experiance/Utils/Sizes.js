import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter{
    constructor(){
        super()
        
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.device = {
            mobile: this.width < 450,
            tab: 810 < this.width > 450 ,
            desktop: this.width >810
        }

        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.device.mobile = this.width < 450
            this.device.tab =  this.width > 450 && this.width < 810
            this.device.desktop = this.width >810
            console.log(this.device)
            
            this.trigger('resize')
        })


    }
}