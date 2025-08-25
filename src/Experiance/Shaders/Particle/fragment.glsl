#include ../includes/remap.glsl

uniform float uTime;
uniform float uSpeed;
uniform vec2 uResolution;

varying float uStrength;

void main(){
    vec2 uv = gl_PointCoord.xy;
    vec3 col = vec3(.0);

    float d =   length(uv - .5);
    d = 1. - smoothstep(.43, .43 + .05, d );
    // col *= d;
    // col *= pow(d, .5);
    col = mix( col, vec3(0.0, 0.2, 0.52), d);
    col = mix( col, col * .0,  uStrength);

    gl_FragColor = vec4(col, d);
    // gl_FragColor = vec4(0.0, 0.38, 1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}