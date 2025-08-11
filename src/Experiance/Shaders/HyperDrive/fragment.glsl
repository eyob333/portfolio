varying vec2 vUv;
varying vec4 uColor;

uniform float uTime;
uniform float uSpeed;
uniform sampler2D uTexture;


void main(){
    vec2 uv = vUv;
    float time = uTime * .0005 * uSpeed;
    uv.y *= .3;
    uv.x *= .5;
    uv.y += time;
    float warp = texture(uTexture, uv).r ;
    // warp = 1. - warp;
    warp = smoothstep(.8, 1., warp);

    warp*= smoothstep(0.0, 0.001, vUv.x);
    warp*= smoothstep(1.0, 0.999, vUv.x);
    warp*= smoothstep(0.0, 0.1, vUv.y);
    warp*= smoothstep(1.0, 0.4, vUv.y);

    gl_FragColor = vec4(1., 1., 1., warp);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}