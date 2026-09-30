import icons from "./techStackIcons"



const img = './images/thing.png'
const vid = '/images/some.png'

const icon = [
    icons[0],
    icons[2],
    icons[4],
    icons[6],

]

const slicedModel = {
    link: 'https://sliced-model-shaders.vercel.app/',
    name: 'sliced model',
    description: '',
    role: 'ffsd',
    img,
    icon,
    vid
}

const sortingVizualizer = {
    link: 'https://sort-visualizer-zeta.vercel.app/',
    name: 'sorting vizualizer',
    description: '',
    role: 'sdfsd',
    upTextC: '#000',
    mainTextC: '#000',
    img,
    icon,
    vid
}

const particlesMorphing = {
    link: 'https://particles-morphing-shader-beige.vercel.app/',
    name: 'particle morphing',
    description: '',
    role: 'sdfse',
    img,
    icon,
    vid
}

const particlescursor = {
    link: 'https://particle-cursor-shaders.vercel.app/',
    name: 'particles cursor',
    description: '',
    role: 'sefsfe',
    img,
    icon,
    vid
}

const earthShader =  {
    link: 'https://earth-shaders-b4.vercel.app/',
    name: 'earth shader',
    description: '',
    role: 'sfseft',
    img,
    icon,
    vid
}

const LabsCards = [
    'spawn',
    slicedModel,
    sortingVizualizer,
    particlesMorphing,
    particlescursor,
    earthShader,
    'spawn'
]

export default LabsCards