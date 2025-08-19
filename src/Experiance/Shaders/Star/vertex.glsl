attribute float aScale;

uniform float uSize;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;

// varying vec2 vUv;

void main(){
    vec3 pos = position;
    pos -= .5;
    float d = length(pos);
    float g = pow(smoothstep(1., .2 , d), .5 ) * 100. ;


    vec3 finPos = vec3(  g * pos ) ;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( (pos / d) * 10., 1.);
    gl_PointSize = aScale * 50. * uSize;

    // csm_Position = finPos;
    // csm_PointSize = aScale * uSize;
    // vec2 nUv =  gl_FragCoord.xy / uResolution.xy;
    // vUv = nUv;
}