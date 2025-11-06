// #include '../includes/ClassicPerlin3D.glsl'
#include ../includes/ClassicPerlin3D.glsl

uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;


void main(){
    vec3 flame = vec3(.0);
    vec2 uv = vUv;
    // uv.y *= fract(uTime * 0.001);
    // uv.y += sin(uTime * .003);
    // flame = vec3(sin(cnoise(uv *  10., uTime) * 10.));
    uv.y -= uTime * .002;
    uv.x += .5;
    float k = ClassicPerlin3D(vec3(uv.x * 15., sin(uv.y * 10.), uTime * .006));
    k = clamp(k, .0, 1.);
    k = smoothstep(.1, .5, k);
    flame = vec3(1.);
    k *= smoothstep( .5, .8, 1. - clamp(vUv.y, .0, 1.));
    gl_FragColor = vec4(flame, k);
}