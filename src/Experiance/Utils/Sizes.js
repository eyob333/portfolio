import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        this.width = 0
        this.height = 0
        this.pixelRatio = 1
        this.device = { mobile: false, tab: false, desktop: false }

        this.update(false)

        const onResize = () => this.update(true)

        window.addEventListener('resize', onResize)
        window.visualViewport?.addEventListener('resize', onResize)
        window.addEventListener('orientationchange', onResize)

        // safety nets for the "wrong initial width" problem
        requestAnimationFrame(onResize)
        window.addEventListener('load', onResize)
        document.fonts?.ready.then(onResize)
        setTimeout(onResize, 300) // RDM sometimes applies its size late
    }

    update(emit = true) {
        const width = document.documentElement.clientWidth
        const height = window.visualViewport?.height ?? window.innerHeight
        const pixelRatio = Math.min(window.devicePixelRatio, 2)

        const changed =
            width !== this.width ||
            height !== this.height ||
            pixelRatio !== this.pixelRatio

        this.width = width
        this.height = height
        this.pixelRatio = pixelRatio

        this.device.mobile = width < 450
        this.device.tab = width >= 450 && width < 810
        this.device.desktop = width >= 810

        console.log('sizes', width, height, this.device)

        if (emit && changed) this.trigger('resize')
    }
}