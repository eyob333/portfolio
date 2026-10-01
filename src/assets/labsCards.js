// LabsCards.js
import icons from "./techStackIcons"


export default (resources) => {
    const vid = resources.item.smtf.src
    const img =  resources.item.labI.src
    console.log(resources)
    return [
    'spawn',
    {
        link: 'https://sliced-model-shaders.vercel.app/',
        name: 'sliced model',
        description: '',
        role: 'ffsd',
        img, // Pulls the preloaded HTMLImageElement
        vid, // Pulls the preloaded HTMLVideoElement
        icon: [icons[0], icons[2], icons[4], icons[6]],
    },
    {
        link: 'https://sort-visualizer-zeta.vercel.app/',
        name: 'sorting vizualizer',
        description: '',
        role: 'sdfsd',
        upTextC: '#000',
        mainTextC: '#000',
        img,
        vid,
        icon: [icons[0], icons[2], icons[4], icons[6]],
    },
    {
        link: 'https://particles-morphing-shader-beige.vercel.app/',
        name: 'particle morphing',
        description: '',
        role: 'sdfse',
        img,
        vid,
        icon: [icons[0], icons[2], icons[4], icons[6]],
    },
    {
        link: 'https://particle-cursor-shaders.vercel.app/',
        name: 'particles cursor',
        description: '',
        role: 'sefsfe',
        img,
        vid,
        icon: [icons[0], icons[2], icons[4], icons[6]],
    },
    {
        link: 'https://earth-shaders-b4.vercel.app/',
        name: 'earth shader',
        description: '',
        role: 'sfseft',
        img,
        vid,
        icon: [icons[0], icons[2], icons[4], icons[6]],
    },
    'spawn'
]};