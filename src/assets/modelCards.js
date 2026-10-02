// ModelCards.js
import icons from "./techStackIcons"

export default (resources) => {
    const img = resources.item.modI?.src || ''
    const vid = resources.item.smtf ?.src || ''
    
    return [
        'spawn',
        {
            link: 'https://sliced-model-shaders.vercel.app/',
            name: 'space ship',
            description: 'Custom slice shader implementation on 3D models',
            role: 'WebGL / Three.js',
            thumbnail: 'https://res.cloudinary.com/dufjxw9zz/image/upload/f_webp/v1747926000/Screenshot_2025-05-22_174008_qqbg0f.webp',
            img,
            vid,
            icon: [icons[0], icons[2], icons[4], icons[6]],
        },
        {
            link: 'https://sort-visualizer-zeta.vercel.app/',
            name: 'portal scene',
            description: 'Interactive portal environment',
            role: 'Shaders / Environment',
            img,
            vid,
            icon: [icons[0], icons[2], icons[4], icons[6]],
        },
        {
            link: 'https://particles-morphing-shader-beige.vercel.app/',
            name: 'alien surge',
            description: 'Particle morphing shader simulation',
            role: 'Shaders / GPUDebug',
            img,
            vid,
            icon: [icons[0], icons[2], icons[4], icons[6]],
        },
        {
            link: 'https://particle-cursor-shaders.vercel.app/',
            name: 'procedural mat',
            description: 'Interactive particle cursor trail shader',
            role: 'Interactive FX',
            img,
            vid,
            icon: [icons[0], icons[2], icons[4], icons[6]],
        },
        {
            link: 'https://earth-shaders-b4.vercel.app/',
            name: 'human face',
            description: 'Atmospheric and procedural shader mapping',
            role: 'Three.js Materials',
            img,
            vid,
            icon: [icons[0], icons[2], icons[4], icons[6]],
        },
        'spawn'
    ];
};