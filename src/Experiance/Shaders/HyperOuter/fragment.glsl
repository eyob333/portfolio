#include ../includes/remap.glsl

varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uResolution;
uniform vec3 uColor;


#define s(x) clamp(x, -.35, .46)

float band(float edge1, float edge2, float blur, float uv){
    float band1 = smoothstep(edge1, edge1 - blur, uv);
    float band2 = smoothstep(edge2 - blur, edge2, uv);
    return band1 * band2;
}

float rect(float right, float left, float top, float bottom, float blur, vec2 uv){
    float x = band(right, left, blur, uv.x) ;
    float y = band(top, bottom, blur, uv.y) ;
    return x * y;
}

void main(){
    vec2 uv = vUv;
    uv -= .5;
    // uv.x *= uResolution.x / uResolution.y;

    // uv.y += uTime * uSpeed * 0.0001;
    // float rect = remap(.4, .1, uv.x);
    vec3 tex = texture2D(uTexture, uv).rgb;
    vec3 col = uColor;

    float fade = uv.y;

    uv.y = fract(  (uv.x * .2)  + uv.y  + uTime* 0.001 * uSpeed  );
    float blur = .001;
    float r = rect(.01, -.00, .1, -.1, blur, uv);
    r +=  rect(.4, .39, .0, -.2, blur, uv);
    r +=  rect(.2, .19, .4, .2, blur, uv);
    r +=  rect(-.43, -.44, .1, -.1, blur, uv);
    r +=  rect(-.2, -.21, .3, .1, blur, uv);
    r +=  rect(.15, .14, -.3, -.48, blur, uv);
    r +=  rect(-.3, -.31, -.2, -.4, blur, uv);
    r +=  rect(-.4, -.41, .45, .35, blur, uv);
    r +=  rect(.5, .49, .35, .18, blur, uv);
    r +=  rect(-.01, -.02, .5, .36, blur, uv);
    r +=  rect(-.15, -.16, -.3, -.5, blur, uv);
    col *= r;

    gl_FragColor = vec4( col, pow(s(fade), 1.) * 2. );

    // gl_FragColor = vec4(0.02, 0.21, 0.49, 1.0);
}