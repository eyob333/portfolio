
uniform float uTime;
uniform float uSpeed;
uniform vec2 uResolution;

void main(){
    vec2 uv = gl_PointCoord.xy;
    vec3 col = vec3(.0);

    float d =   length(uv - .5);
    d = 1. - smoothstep(.43, .43 + .05, d );
    // col *= d;
    // col *= pow(d, .5);
    col = mix( col, vec3(.2, .5, .3), d);
    col *= k + .2;

    gl_FragColor = vec4(col, d);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}