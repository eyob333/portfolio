#include '../includes/ClassicPerlin2D.glsl'

uniform float uTime;

varying vec2 vUv;

void main(){
    vec3 flame = vec3(.0);
    vec2 uv = vUv;
    // uv.y *= fract(uTime * 0.001);
    uv.y += sin(uTime * .003);
    flame = vec3(sin(cnoise(uv *  10.) * 10.));
    
    gl_FragColor = vec4(flame, 1.);
}