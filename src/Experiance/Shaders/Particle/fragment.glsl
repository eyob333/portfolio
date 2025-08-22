
uniform float uTime;
uniform float uSpeed;
uniform vec2 uResolution;

void main(){
    vec2 uv = gl_PointCoord.xy;

    gl_FragColor = vec4(uv.xy, 1., 1.);
}